// lib/create.js
import path from "path";

// fs-extra 是对 fs 模块的扩展，支持 promise 语法
import fsExtra from "fs-extra";
import inquirer from "inquirer";
import { Generator } from "./Generator.js";
export const _create = async function (name, options) {
  // 执行创建命令

  // 当前命令行选择的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetAir = path.join(cwd, name);
  // 目录是否已经存在？
  if (fsExtra.existsSync(targetAir)) {
    // 是否为强制创建？
    if (options.force) {
      await fsExtra.remove(targetAir);
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "目标文件已经存在，请选择一个操作:",
          choices: [
            {
              name: "覆盖",
              value: "overwrite",
            },
            {
              name: "取消",
              value: false,
            },
          ],
        },
      ]);

      if (!action) {
        return;
      } else if (action === "overwrite") {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`);
        await fsExtra.remove(targetAir);
      }
    }
  }
  // 创建项目
  const generator = new Generator(name, targetAir);

  // 开始创建项目
  generator.create();
};
