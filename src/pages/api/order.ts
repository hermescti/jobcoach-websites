// API Endpoint: Order Form Handler
// POST /api/order
// Location: src/pages/api/order.ts

import type { APIRoute } from 'astro';
import { appendOrderToSheet, createOrderData } from '../../lib/sheets';
import { sendConfirmationEmail } from '../../lib/email';

// Force server-side rendering for API endpoint
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    
    // Validate required fields for jobcoach orders
    const required = ['fullName', 'title', 'specialization', 'experience', 'email', 'phone', 'package'];
    const missing = required.filter((field: keyof typeof body) => !body[field]);
    
    if (missing.length > 0) {
      return new Response(
        JSON.stringify({ error: `Missing fields: ${missing.join(', ')}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email address' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate phone format (basic)
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/;
    if (!phoneRegex.test(body.phone)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate experience range
    const experience = parseInt(body.experience, 10);
    if (isNaN(experience) || experience < 0 || experience > 50) {
      return new Response(
        JSON.stringify({ error: 'Experience must be between 0 and 50 years' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare order data
    const orderData = {
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
      ...body,
      
      // Normalize coaching modes
      coachingModes: body.coachingModes || [],
      
      // Normalize competencies
      competencies: body.competencies || [],
      
      // Normalize languages
      languages: body.languages || [],
      
      // Normalize locations
      locations: body.locationCities?.map((city: string, i: number) => ({
        city,
        country: body.locationCountries?.[i] || ''
      })).filter((l: any) => l.city) || []
    };

    console.log('✅ New jobcoach order received:', orderData.id);
    console.log('Name:', orderData.fullName);
    console.log('Title:', orderData.title);
    console.log('Package:', orderData.package);
    console.log('Email:', orderData.email);
    console.log('Competencies:', orderData.competencies.length);
    console.log('Languages:', orderData.languages.length);

    // Persist to Google Sheets
    try {
      const sheetData = createOrderData(body, orderData.id);
      await appendOrderToSheet(sheetData);
      console.log('✅ Order saved to Google Sheets');
    } catch (sheetError) {
      console.error('❌ Google Sheets error:', sheetError);
      // Don't fail the request if Sheets fails - log and continue
      // TODO: Add alerting for persistent Sheets failures
    }

    // Send confirmation email
    try {
      await sendConfirmationEmail({
        orderId: orderData.id,
        fullName: orderData.fullName,
        email: orderData.email,
        package: orderData.package,
        title: orderData.title,
      });
    } catch (emailError) {
      console.error('❌ Email error:', emailError);
      // Don't fail the request if email fails - log and continue
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        orderId: orderData.id,
        message: 'Order received. We will contact you within 24 hours.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('❌ Order API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: `Internal server error: ${errorMessage}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
