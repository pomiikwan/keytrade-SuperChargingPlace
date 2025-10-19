#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
财务分析内容预加载脚本
将../docs文件夹中的财务分析.md文件转换为JavaScript变量
用于财务图表.html页面的预加载内容功能
"""

import os
import re
import json
from datetime import datetime

def escape_js_string(text):
    """
    转义JavaScript字符串中的特殊字符
    """
    return text.replace('\\', '\\\\').replace('"', '\\"').replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r')

def read_markdown_file(file_path):
    """
    读取Markdown文件内容
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"读取文件 {file_path} 失败: {e}")
        return None

def generate_js_content():
    """
    生成JavaScript内容文件
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    md_dir = os.path.join(base_dir, "..")
    js_output_path = os.path.join(base_dir, "financial_analysis_content.js")

    print("=" * 60)
    print("财务分析内容预加载脚本")
    print("=" * 60)

    # 读取财务分析文件
    financial_analysis_file = os.path.join(md_dir, "财务分析.md")

    if not os.path.exists(financial_analysis_file):
        print(f"❌ 错误：找不到财务分析文件 {financial_analysis_file}")
        return False

    print(f"📖 读取财务分析文件: {financial_analysis_file}")
    financial_analysis_content = read_markdown_file(financial_analysis_file)

    if not financial_analysis_content:
        print("❌ 读取财务分析内容失败")
        return False

    # 获取文件修改时间
    try:
        mtime = os.path.getmtime(financial_analysis_file)
        modified_time = datetime.fromtimestamp(mtime).strftime("%Y-%m-%d %H:%M:%S")
    except:
        modified_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # 生成JavaScript内容
    js_content = f'''/**
 * 财务分析内容预加载文件
 * 自动生成于 {modified_time}
 * 源文件: ../docs/财务分析.md
 */

// 财务分析内容
const FINANCIAL_ANALYSIS_CONTENT = `{escape_js_string(financial_analysis_content)}`;

// 内容修改时间戳
const FINANCIAL_ANALYSIS_MODIFIED = "{modified_time}";

// 内容加载状态
const FINANCIAL_ANALYSIS_LOADED = true;

console.log("财务分析内容已预加载", {{
    contentLength: FINANCIAL_ANALYSIS_CONTENT.length,
    modifiedTime: FINANCIAL_ANALYSIS_MODIFIED,
    loaded: FINANCIAL_ANALYSIS_LOADED
}});
'''

    # 写入JavaScript文件
    try:
        with open(js_output_path, 'w', encoding='utf-8') as f:
            f.write(js_content)
        print(f"✅ JavaScript文件已生成: {js_output_path}")
        print(f"📊 内容长度: {len(financial_analysis_content)} 字符")
        print(f"🕒 修改时间: {modified_time}")
    except Exception as e:
        print(f"❌ 写入JavaScript文件失败: {e}")
        return False

    print("=" * 60)
    print("✅ 财务分析内容预加载完成")
    print("📝 使用方法:")
    print("   1. 在HTML中引入: <script src=\"financial_analysis_content.js\"></script>")
    print("   2. 在JavaScript中使用: FINANCIAL_ANALYSIS_CONTENT")
    print("   3. 检查状态: FINANCIAL_ANALYSIS_LOADED")
    print("=" * 60)

    return True

def update_existing_files():
    """
    更新现有的preloader文件以包含财务分析内容
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    existing_preloader = os.path.join(base_dir, "preload_md_content.py")

    if os.path.exists(existing_preloader):
        print("📝 检测到现有的preload_md_content.py文件")
        print("💡 建议将财务分析内容预加载功能集成到现有脚本中")
        return True

    return False

def main():
    """
    主函数
    """
    print("🚀 开始财务分析内容预加载...")

    success = generate_js_content()

    if success:
        update_existing_files()
        print("\n🎉 任务完成！")
        print("💡 下一步:")
        print("   1. 刷新财务图表.html页面")
        print("   2. 检查控制台日志确认预加载成功")
        print("   3. 测试手动刷新按钮功能")
    else:
        print("\n❌ 任务失败，请检查错误信息")

if __name__ == "__main__":
    main()