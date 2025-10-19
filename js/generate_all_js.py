#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
千站超充项目 - 统一JS内容生成器
功能：批量调用所有preload脚本生成对应的JS文件
版本：1.0
更新时间：2025年1月
"""

import os
import subprocess
import sys
from typing import List, Dict, Any

class JSContentGenerator:
    """JS内容文件生成器"""

    def __init__(self):
        self.current_dir = os.path.dirname(os.path.abspath(__file__))
        self.docs_dir = os.path.dirname(self.current_dir)

    def find_preload_scripts(self) -> List[str]:
        """查找所有preload脚本"""
        preload_scripts = []

        for file in os.listdir(self.current_dir):
            if file.startswith("preload_") and file.endswith(".py"):
                preload_scripts.append(file)

        return sorted(preload_scripts)

    def run_single_script(self, script_name: str) -> bool:
        """运行单个preload脚本"""
        script_path = os.path.join(self.current_dir, script_name)

        try:
            print(f"🔄 正在运行：{script_name}")

            # 运行脚本并捕获输出
            result = subprocess.run(
                [sys.executable, script_path],
                cwd=self.current_dir,
                capture_output=True,
                text=True,
                timeout=30
            )

            if result.returncode == 0:
                print(f"✅ {script_name} 执行成功")
                if result.stdout:
                    print(f"   输出：{result.stdout.strip()}")
                return True
            else:
                print(f"❌ {script_name} 执行失败")
                if result.stderr:
                    print(f"   错误：{result.stderr.strip()}")
                return False

        except subprocess.TimeoutExpired:
            print(f"⏰ {script_name} 执行超时")
            return False
        except Exception as e:
            print(f"❌ {script_name} 执行异常：{str(e)}")
            return False

    def verify_generated_js_files(self) -> Dict[str, bool]:
        """验证生成的JS文件"""
        js_files = {}

        for file in os.listdir(self.current_dir):
            if file.endswith("_content.js"):
                file_path = os.path.join(self.current_dir, file)

                try:
                    # 检查文件是否存在且不为空
                    if os.path.exists(file_path) and os.path.getsize(file_path) > 0:
                        # 简单验证JS语法
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()

                        # 基本JS语法检查
                        if content.strip().startswith('const') or content.strip().startswith('var'):
                            js_files[file] = True
                            print(f"✅ JS文件验证通过：{file}")
                        else:
                            js_files[file] = False
                            print(f"⚠️ JS文件格式异常：{file}")
                    else:
                        js_files[file] = False
                        print(f"❌ JS文件为空或不存在：{file}")

                except Exception as e:
                    js_files[file] = False
                    print(f"❌ JS文件验证失败 {file}：{str(e)}")

        return js_files

    def get_file_sizes(self) -> Dict[str, str]:
        """获取生成的文件大小信息"""
        file_sizes = {}

        for file in os.listdir(self.current_dir):
            if file.endswith("_content.js") or file.startswith("preload_"):
                file_path = os.path.join(self.current_dir, file)
                if os.path.exists(file_path):
                    size = os.path.getsize(file_path)
                    if size < 1024:
                        size_str = f"{size}B"
                    elif size < 1024 * 1024:
                        size_str = f"{size/1024:.1f}KB"
                    else:
                        size_str = f"{size/(1024*1024):.1f}MB"

                    file_sizes[file] = size_str

        return file_sizes

    def run_generation_process(self) -> bool:
        """执行完整的生成流程"""
        print("🚀 开始统一JS内容生成流程...")
        print(f"📂 工作目录：{self.current_dir}")

        # 查找所有preload脚本
        preload_scripts = self.find_preload_scripts()

        if not preload_scripts:
            print("❌ 未找到任何preload脚本")
            return False

        print(f"📋 找到 {len(preload_scripts)} 个preload脚本：")
        for script in preload_scripts:
            print(f"   - {script}")

        # 运行所有脚本
        print(f"\n🔄 开始批量执行...")
        success_count = 0

        for script in preload_scripts:
            if self.run_single_script(script):
                success_count += 1

        # 验证生成的JS文件
        print(f"\n🔍 验证生成的JS文件...")
        js_files_status = self.verify_generated_js_files()

        # 显示文件信息
        print(f"\n📊 文件生成统计：")
        file_sizes = self.get_file_sizes()

        print(f"\n📄 Preload脚本执行结果：")
        print(f"✅ 成功：{success_count}/{len(preload_scripts)}")
        print(f"❌ 失败：{len(preload_scripts) - success_count}/{len(preload_scripts)}")

        print(f"\n📄 JS文件生成结果：")
        js_success = sum(1 for status in js_files_status.values() if status)
        print(f"✅ 成功：{js_success}/{len(js_files_status)}")
        print(f"❌ 失败：{len(js_files_status) - js_success}/{len(js_files_status)}")

        print(f"\n📁 文件大小信息：")
        for file_name, size in file_sizes.items():
            status = "✅" if file_name.endswith("_content.js") and js_files_status.get(file_name, False) else "📄"
            print(f"   {status} {file_name}: {size}")

        # 输出下一步操作建议
        if success_count == len(preload_scripts) and js_success == len(js_files_status):
            print(f"\n🎉 所有JS内容文件生成完成！")
            print(f"\n📋 下一步操作建议：")
            print(f"1. 检查生成的JS文件内容")
            print(f"2. 运行主站的 auto_update_content.py 更新HTML页面")
            print(f"3. 验证HTML页面显示效果")
        else:
            print(f"\n⚠️ 部分文件生成失败，请检查错误信息")
            print(f"\n🔧 故障排除建议：")
            print(f"1. 检查对应的MD文件是否存在")
            print(f"2. 确认Python环境正常")
            print(f"3. 手动运行失败的脚本查看详细错误")

        return success_count > 0 and js_success > 0

def main():
    """主函数"""
    generator = JSContentGenerator()
    success = generator.run_generation_process()

    return success

if __name__ == "__main__":
    main()