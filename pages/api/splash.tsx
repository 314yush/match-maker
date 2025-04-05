import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const config = {
  runtime: 'edge',
};

const pressStart2P = fetch(
  new URL('https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2', import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontData = await pressStart2P;

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
            backgroundColor: '#2c2137',
            fontFamily: '"Press Start 2P"',
            backgroundImage: `
              linear-gradient(45deg, #3f3544 25%, transparent 25%),
              linear-gradient(-45deg, #3f3544 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #3f3544 75%),
              linear-gradient(-45deg, transparent 75%, #3f3544 75%)
            `,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px',
          }}
        >
          {/* Pixelated Border */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              right: '20px',
              bottom: '20px',
              border: '8px solid #92cc41',
              boxShadow: `
                0 0 0 8px #209cee,
                0 0 0 16px #e76e55
              `,
            }}
          />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '40px',
              padding: '60px',
              position: 'relative',
            }}
          >
            <h1
              style={{
                fontSize: 100,
                color: '#e76e55',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.2,
                textShadow: `
                  4px 4px 0 #209cee,
                  8px 8px 0 #2c2137
                `,
                WebkitTextStroke: '2px #2c2137',
              }}
            >
              CRYPTO
              <br />
              MATCH
            </h1>
            
            <div
              style={{
                fontSize: 32,
                color: '#92cc41',
                textAlign: 'center',
                lineHeight: 1.5,
                textShadow: '4px 4px #2c2137',
                padding: '20px',
                border: '4px solid #92cc41',
                backgroundColor: '#2c2137',
              }}
            >
              🎮 Play & Earn
              <br />
              10,000 FCAST! 💰
            </div>

            <div
              style={{
                background: '#e76e55',
                padding: '4px',
              }}
            >
              <div
                style={{
                  background: '#92cc41',
                  padding: '24px 48px',
                  fontSize: 40,
                  color: '#2c2137',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  border: '4px solid #2c2137',
                }}
              >
                Play Now
              </div>
            </div>
          </div>

          {/* Pixel Art Crypto Symbols */}
          <div style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            fontSize: 64,
            color: '#e76e55',
            textShadow: '4px 4px #2c2137',
            transform: 'rotate(-15deg)',
          }}>₿</div>
          <div style={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            fontSize: 64,
            color: '#209cee',
            textShadow: '4px 4px #2c2137',
            transform: 'rotate(15deg)',
          }}>Ξ</div>
          <div style={{
            position: 'absolute',
            bottom: '25%',
            left: '20%',
            fontSize: 64,
            color: '#92cc41',
            textShadow: '4px 4px #2c2137',
            transform: 'rotate(-10deg)',
          }}>◎</div>
          <div style={{
            position: 'absolute',
            bottom: '35%',
            right: '10%',
            fontSize: 64,
            color: '#e76e55',
            textShadow: '4px 4px #2c2137',
            transform: 'rotate(10deg)',
          }}>₳</div>
        </div>
      ),
      {
        width: 1200,
        height: 800,
        fonts: [
          {
            name: 'Press Start 2P',
            data: fontData,
            style: 'normal',
            weight: 400,
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