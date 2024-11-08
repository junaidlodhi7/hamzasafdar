import { Request, Response } from "express";
import puppeteer from "puppeteer";
import convertToProperUrl from "../../utils/screenshotUtility";
const fs = require("fs");
const path = require("path");
import logger from '../../utils/logging';
export const takeScreeshot = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { url } = req.body;

  if (!url) return res.status(400).json({ message: "URL is required" });

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        // "--no-sandbox",
        // "--disable-setuid-sandbox",
        // "--disable-dev-shm-usage",
        // "--disable-gpu", // Disable GPU to improve performance
        // "--disable-features=IsolateOrigins,site-per-process",
      ],
    });
    const page = await browser.newPage();
    // Block unnecessary requests for faster loading
    await page.setRequestInterception(true);
    // page.on("request", (req) => {
    //   if (
    //     ["image", "stylesheet", "font", "media"].includes(req.resourceType())
    //   ) {
    //     req.abort(); // Skip these resources
    //   } else {
    //     req.continue();
    //   }
    // });
    await page.goto(convertToProperUrl(url), {    waitUntil: 'networkidle2',
    //  waitUntil: "domcontentloaded", // Don't wait for all resources, just the DOM
    //  timeout: 30000, // 30 seconds timeout for loading
    });
    const dirPath =   path.join(__dirname, '../../../src/public');
    const imagePath = path.join(dirPath, 'screenshot.jpeg');
    await page.screenshot({
      path: imagePath,
      type:'jpeg'
      
    });
    logger.info(`file path:${imagePath}`)
    await browser.close();

    return res.status(200).json({ image:imagePath });
  } catch (err) {
    res.status(500).json({ message: "Failed to capture screenshot" });
  }
};
