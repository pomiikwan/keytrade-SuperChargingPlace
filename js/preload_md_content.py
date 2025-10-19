#!/usr/bin/env python3
"""
MD文件内容预加载脚本
将MD文件内容转换为JavaScript变量，直接嵌入HTML中使用
"""

import os
import re
from pathlib import Path
import json

def md_to_js_string(md_content):
    """将MD内容转换为JavaScript字符串"""
    # 使用JSON编码确保安全转义
    import json
    return json.dumps(md_content, ensure_ascii=False)

def generate_md_js():
    """生成包含MD内容的JavaScript文件"""
    script_dir = Path(__file__).parent
    md_file = script_dir / ".." / "市场分析.md"
    js_file = script_dir / "market_analysis_content.js"

    if md_file.exists():
        # 读取MD文件内容
        with open(md_file, 'r', encoding='utf-8') as f:
            md_content = f.read()

        # 使用JSON编码确保安全转义，避免语法错误
        escaped_content = md_to_js_string(md_content)

        # 转换为JavaScript字符串 - 使用字符串拼接避免模板字符串问题
        js_content = f"""// 自动生成的市场分析内容
// 生成时间: {os.path.getmtime(md_file)}
const MARKET_ANALYSIS_CONTENT = {escaped_content};

// 获取文件修改时间
const MARKET_ANALYSIS_MODIFIED = {os.path.getmtime(md_file)};

console.log('✅ 市场分析内容已预加载，修改时间:', new Date(MARKET_ANALYSIS_MODIFIED * 1000).toLocaleString());
"""

        # 写入JavaScript文件
        with open(js_file, 'w', encoding='utf-8') as f:
            f.write(js_content)

        print(f"✅ 已生成 {js_file}")
        print(f"📄 MD文件大小: {len(md_content)} 字符")
        print(f"🕒 修改时间: {os.path.getmtime(md_file)}")

        return True
    else:
        print(f"❌ 找不到MD文件: {md_file}")
        return False

if __name__ == "__main__":
    generate_md_js()