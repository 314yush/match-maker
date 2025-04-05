import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const config = {
  runtime: 'edge',
};

const interBold = fetch(
  new URL('https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZJhjp-Ek-_0ew.woff2', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontData = await interBold;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1c2c',
            fontFamily: 'Inter',
            backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.15) 2%, transparent 0%)',
            backgroundSize: '100px 100px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              padding: '60px',
              borderRadius: '30px',
              background: 'rgba(0, 0, 0, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <h1
              style={{
                fontSize: 140,
                color: 'white',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1,
                textShadow: '0 0 40px rgba(255, 82, 82, 0.8), 6px 6px 0 #ff5252, -6px -6px 0 #209CEE',
                letterSpacing: '-0.02em',
              }}
            >
              CRYPTO
              <br />
              MATCH
            </h1>
            
            <div
              style={{
                fontSize: 56,
                color: 'white',
                textAlign: 'center',
                textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
                background: 'linear-gradient(135deg, #ff5252, #209CEE)',
                WebkitBackgroundClip: 'text',
                padding: '20px',
                border: '4px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '15px',
              }}
            >
              🎮 Play & Earn
              <br />
              10,000 FCAST! 💰
            </div>

            <div
              style={{
                background: 'linear-gradient(135deg, #ff5252, #209CEE)',
                padding: '2px',
                borderRadius: '15px',
                boxShadow: '0 8px 32px rgba(32, 156, 238, 0.4)',
              }}
            >
              <div
                style={{
                  background: 'white',
                  padding: '24px 64px',
                  borderRadius: '13px',
                  fontSize: 48,
                  color: '#1a1c2c',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                Play Now
              </div>
            </div>
          </div>

          {/* Crypto Symbols with Glow */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            fontSize: 100,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 0 40px rgba(255, 82, 82, 0.8)',
            transform: 'rotate(-15deg)',
          }}>₿</div>
          <div style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            fontSize: 100,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 0 40px rgba(32, 156, 238, 0.8)',
            transform: 'rotate(15deg)',
          }}>Ξ</div>
          <div style={{
            position: 'absolute',
            bottom: '25%',
            left: '20%',
            fontSize: 100,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 0 40px rgba(255, 82, 82, 0.8)',
            transform: 'rotate(-10deg)',
          }}>◎</div>
          <div style={{
            position: 'absolute',
            bottom: '35%',
            right: '10%',
            fontSize: 100,
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 0 40px rgba(32, 156, 238, 0.8)',
            transform: 'rotate(10deg)',
          }}>₳</div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 