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
            fontFamily: '"Press Start 2P"',
            background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))',
            position: 'relative',
          }}
        >
          {/* Semi-transparent overlay container */}
          <div
            style={{
              background: 'rgba(0,0,0,0.7)',
              padding: '40px',
              borderRadius: '20px',
              border: '4px solid #92cc41',
              boxShadow: '0 0 0 4px #209cee, 0 0 0 8px #e76e55',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '30px',
            }}
          >
            <h1
              style={{
                fontSize: 80,
                color: '#ffffff',
                textAlign: 'center',
                margin: 0,
                lineHeight: 1.2,
                textShadow: '4px 4px 0 #e76e55',
              }}
            >
              CRYPTO
              <br />
              MATCH
            </h1>
            
            <div
              style={{
                fontSize: 28,
                color: '#92cc41',
                textAlign: 'center',
                lineHeight: 1.5,
                textShadow: '2px 2px #000000',
                padding: '15px',
                border: '2px solid #92cc41',
                background: 'rgba(0,0,0,0.5)',
              }}
            >
              🎮 Play & Earn
              <br />
              10,000 FCAST! 💰
            </div>

            <div
              style={{
                background: '#e76e55',
                padding: '3px',
              }}
            >
              <div
                style={{
                  background: '#92cc41',
                  padding: '20px 40px',
                  fontSize: 32,
                  color: '#ffffff',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  border: '2px solid #000000',
                  textShadow: '2px 2px #000000',
                }}
              >
                Play Now
              </div>
            </div>
          </div>

          {/* Crypto Symbols with better visibility */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            fontSize: 48,
            color: '#ffffff',
            textShadow: '2px 2px #000000',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '10px',
            transform: 'rotate(-15deg)',
          }}>₿</div>
          <div style={{
            position: 'absolute',
            top: '20%',
            right: '5%',
            fontSize: 48,
            color: '#ffffff',
            textShadow: '2px 2px #000000',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '10px',
            transform: 'rotate(15deg)',
          }}>Ξ</div>
          <div style={{
            position: 'absolute',
            bottom: '20%',
            left: '10%',
            fontSize: 48,
            color: '#ffffff',
            textShadow: '2px 2px #000000',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '10px',
            transform: 'rotate(-10deg)',
          }}>◎</div>
          <div style={{
            position: 'absolute',
            bottom: '30%',
            right: '5%',
            fontSize: 48,
            color: '#ffffff',
            textShadow: '2px 2px #000000',
            background: 'rgba(0,0,0,0.5)',
            padding: '10px',
            borderRadius: '10px',
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