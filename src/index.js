/**
 * @author nokarin-dev
 * @license MIT
 * @copyright nokarin-dev
 * @file index.js
 */

'use strict';

require("dotenv").config({ path: require("fs").existsSync(".env.local") ? ".env.local" : ".env" });

const axios = require("axios");
const { CelerisError } = require("./error");

async function testAndPush(testFn, options = {}) {
    const {
        project = "default",
        apiUrl = "https://api.strivo.xyz/v1/build/status",
        apiKey = process.env.CELERIS_API_KEY
    } = options;

    if (!apiKey) throw new CelerisError(
        "please get the api key from https://celeris.strivo.xyz/dashboard/api. If you already have one, read the docs for more information https://celeris.strivo.xyz/docs",
        "MISSING_API_KEY",
    )

    const headers = {
        "Authorization": `Bearer ${apiKey}`
    };

    // Push pending status
    try {
        await axios.post(apiUrl, {
            status: "pending",
            timestamp: new Date().toISOString(),
            project
        }, { headers });
        console.log(`Testing ${project}...`);
    } catch (e) {
        console.error("Failed while push pending status to APIs:", e.message);
    };

    // Run test
    let status = "success";
    try {
        await Promise.resolve(testFn());
    } catch (e) {
        console.error(`Test ${project} failed:`, e);
        status = "failed";
    };

    // Push final status
    try {
        await axios.post(apiUrl, {
            status,
            timestamp: new Date().toISOString(),
            project
        }, { headers });
        console.log(`Final status (${status}) pushed.`);
    } catch (e) {
        console.error("Failed while push status to APIs:", e.message);
    };
};

module.exports = {
    testAndPush,
};