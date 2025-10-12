#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
参数更新和结果刷新自动化脚本
使用方法：python auto_refresh.py
"""

import subprocess
import time
import os
from datetime import datetime

def run_calculation():
    """运行财务计算程序"""
    try:
        print("🔄 开始运行财务计算...")
        result = subprocess.run(['python', '千站主文档.py'],
                              capture_output=True, text=True, encoding='utf-8')

        if result.returncode == 0:
            print("✅ 计算完成！")
            print(result.stdout)
            return True
        else:
            print("❌ 计算失败：")
            print(result.stderr)
            return False

    except Exception as e:
        print(f"❌ 运行程序时出错：{str(e)}")
        return False

def check_file_modified():
    """检查参数文件是否有修改"""
    try:
        # 获取文件修改时间
        stat = os.stat('千站液冷超充商业闭环方案.md')
        modified_time = stat.st_mtime

        # 记录上次检查时间（这里简化处理，实际应用中可以保存到文件）
        if not hasattr(check_file_modified, 'last_check_time'):
            check_file_modified.last_check_time = modified_time
            return False

        if modified_time > check_file_modified.last_check_time:
            check_file_modified.last_check_time = modified_time
            return True

        return False

    except Exception as e:
        print(f"⚠️  检查文件修改状态失败：{str(e)}")
        return False

def auto_refresh_loop():
    """自动刷新循环"""
    print("🚀 启动参数-计算-结果自动同步系统")
    print("=" * 50)
    print("使用说明：")
    print("1. 修改《千站液冷超充商业闭环方案.md》中的参数")
    print("2. 程序会自动检测变化并重新计算")
    print("3. 结果会自动更新到markdown文档中")
    print("按 Ctrl+C 退出程序")
    print("=" * 50)

    # 首次运行
    run_calculation()

    try:
        while True:
            time.sleep(2)  # 每2秒检查一次

            if check_file_modified():
                print(f"\n📝 检测到参数文件修改 ({datetime.now().strftime('%H:%M:%S')})")
                run_calculation()

    except KeyboardInterrupt:
        print("\n👋 自动刷新系统已停止")

def manual_refresh():
    """手动刷新模式"""
    print("🔄 手动刷新模式")
    print("按 Enter 键运行计算，输入 'quit' 退出")

    while True:
        user_input = input("\n按 Enter 运行计算 (或输入 'quit' 退出): ")

        if user_input.lower() == 'quit':
            print("👋 程序已退出")
            break

        run_calculation()

def main():
    """主函数"""
    print("千站液冷超充项目自动化计算系统")
    print("=" * 40)
    print("请选择运行模式：")
    print("1. 自动刷新模式（检测文件变化自动计算）")
    print("2. 手动刷新模式（按Enter键手动计算）")

    choice = input("请输入选择 (1 或 2): ").strip()

    if choice == '1':
        auto_refresh_loop()
    elif choice == '2':
        manual_refresh()
    else:
        print("❌ 无效选择，程序已退出")

if __name__ == "__main__":
    main()