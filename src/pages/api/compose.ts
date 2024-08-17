// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dotenv from 'dotenv';
dotenv.config();
import type { NextApiRequest, NextApiResponse } from "next";
import { NeynarAPIClient } from "@neynar/nodejs-sdk";
const NEYNAR_API_KEY = process.env['NEYNAR_API_KEY'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ComposerActionFormResponse | ComposerActionMetadata>,
) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data);

    const client = new NeynarAPIClient(NEYNAR_API_KEY);
    let result;
    let trusted_data;
    // console.log(body?.trustedData)
    if (1===2) { //QA test with hardcoded messageBytes from a real cast
      console.log('local testing is ON')
      trusted_data = '0a61080d108a810118aea0aa2e20018201510a3168747470733a2f2f6672616d652d6561732d6133343234333536303538362e6865726f6b756170702e636f6d2f6261736510031a1a088a8101121427f8122fa7e4fdf22beafce0ff38eead51c644f312143715aa0a65ba847689b82057ebc9ac1e4b7e57361801224016c5969ad511f65c17f2d7462ae3c412a34d8d0dc2fd01bab505704cdf04314f615bf8523558fd98f234d5701e5182c69cedcd9ffb81d75a937ad75da2c38b0b280132204e42acc1786aba2b49619f7edae329009f419128916f5f187f80d35411879bb4'
      result = await client.validateFrameAction(trusted_data);
    } else {
      trusted_data = data?.trustedData?.messageBytes
      result = await client.validateFrameAction(trusted_data);
    }

    console.log(result)

    res.status(200).json({ 
      type: 'form',
      title: 'dTech.vision',
      url: 'https://0a8f-24-90-2-217.ngrok-free.app', // make sure this is your public URL e.g. http://localhost:3000 for local testing
    });
  } else if (req.method === 'GET') {
    res.status(200).json({
        "type": "composer",
        "name": "andrew test",
        "icon": "checkbox", // supported list: https://docs.farcaster.xyz/reference/actions/spec#valid-icons
        "description": "Create a poll frame",
        "aboutUrl": "https://your-app-server.example.com/about",
        "imageUrl": "https://your-app-server.example.com/static/logo.png",
        "action": {
          "type": "post",
        }
    });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
