#! /usr/bin/env node

import chalk from "chalk";
import { program } from "commander/esm.mjs";
import figlet from "figlet";
import inquirer from "inquirer";
import { _create } from "../lib/create.js";

program
  // 定义命令和参数
  .command("create <app-name>")
  .description("create a new project")
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // 在 create.js 中执行创建任务
    _create(name, options);
  });
// bin/cli.js

// bin/cli.js

program.on("--help", () => {
  // 使用 figlet 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("chunk", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`roc <command> --help`)} show details\r\n`);
});

// 解析用户执行命令传入参数
program.parse(process.argv);
