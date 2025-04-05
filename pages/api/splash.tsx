import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const fontData = await fetch(
      new URL('../../public/fonts/Minecraftia-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());

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
            fontFamily: 'Minecraftia',
          }}
        >
          {/* Background Grid */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, rgba(255,82,82,0.1) 0%, rgba(32,156,238,0.1) 100%)',
              transform: 'perspective(500px) rotateX(30deg)',
            }}
          />
          
          {/* Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            <h1
              style={{
                fontSize: 120,
                color: 'white',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1,
                textShadow: '5px 5px 0 #ff5252, -5px -5px 0 #209CEE',
              }}
            >
              CRYPTO
              <br />
              MATCH
            </h1>
            
            <div
              style={{
                fontSize: 48,
                color: 'white',
                textAlign: 'center',
                textShadow: '4px 4px 0 #209CEE, -4px -4px 0 #ff5252',
                textTransform: 'uppercase',
              }}
            >
              🎮 Play & Earn
              <br />
              10,000 FCAST! 💰
            </div>

            <div
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '24px 48px',
                borderRadius: '12px',
                fontSize: 40,
                color: '#1a1c2c',
                fontWeight: 'bold',
                transform: 'skew(-5deg)',
                border: '4px solid #ff5252',
                boxShadow: '8px 8px 0 #209CEE',
              }}
            >
              PLAY NOW
            </div>
          </div>

          {/* Crypto Symbols */}
          <div style={{ position: 'absolute', top: '15%', left: '10%', fontSize: 80, color: 'rgba(255,255,255,0.8)' }}>₿</div>
          <div style={{ position: 'absolute', top: '25%', right: '15%', fontSize: 80, color: 'rgba(255,255,255,0.8)' }}>Ξ</div>
          <div style={{ position: 'absolute', bottom: '25%', left: '20%', fontSize: 80, color: 'rgba(255,255,255,0.8)' }}>◎</div>
          <div style={{ position: 'absolute', bottom: '35%', right: '10%', fontSize: 80, color: 'rgba(255,255,255,0.8)' }}>₳</div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
        fonts: [
          {
            name: 'Minecraftia',
            data: fontData,
            style: 'normal',
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