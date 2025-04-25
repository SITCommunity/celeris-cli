#!/usr/bin/env node

require("dotenv").config({ path: require("fs").existsSync(".env.local") ? ".env.local" : ".env" });

const axios = require("axios");
const { program } = require("commander");
const { CelerisError } = require("../src/error");
const package_version = require("../package.json").version;

program
    .name("celeris")
    .description("Celeris delivers real-time visibility into build pipelines, CI/CD health, and key development metrics — built for speed, designed for devs.")
    .version(package_version);

program
    .command("push")
    .requiredOption("--build-status <status>", "Build status: pending, success, or failed")
    .requiredOption("--project <name>", "Project name is required")
    .action(async (opts) => {
        const apiUrl = "https://api.strivo.xyz/v1/build/status";
        const apiKey = process.env.CELERIS_API_KEY;

        if (!apiKey)
            throw new CelerisError(
                "please get the api key from https://celeris.strivo.xyz/dashboard/api. If you already have one, read the docs for more information https://celeris.strivo.xyz/docs",
                "MISSING_API_KEY",
            )

        try {
            const res = await axios.post(apiUrl, {
                status: opts.buildStatus,
                timestamp: new Date().toISOString(),
                project: opts.project
            }, {
                headers: {
                    Authorization: `Bearer ${apiKey}`
                },
            });
            console.info("Status pushed:", res.data);
        } catch (e) {
            console.error("Failed to push status:\n", e.message);
        };
    });

program.parse();