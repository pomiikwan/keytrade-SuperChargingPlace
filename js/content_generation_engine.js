/**
 * 智能内容生成引擎
 * 集成版本化内容系统，提供智能化的商业计划书生成功能
 *
 * 主要功能：
 * - 集成现有JavaScript内容模块系统
 * - 支持版本化内容适配和章节自定义
 * - 提供智能内容组合和优化
 * - 支持PDF导出集成
 */

class ContentGenerationEngine {
    constructor() {
        this.versionedContentSystem = new VersionedContentSystem();
        this.contentOptimizer = new ContentOptimizer();
        this.pdfExportManager = new PDFExportManager();
        this.cache = new Map();

        this.isInitialized = false;
    }

    /**
     * 初始化引擎
     */
    async initialize() {
        if (this.isInitialized) return;

        try {
            console.log('正在初始化内容生成引擎...');

            // 加载版本化内容系统
            await this.versionedContentSystem.loadContentModules();

            this.isInitialized = true;
            console.log('内容生成引擎初始化完成');
        } catch (error) {
            console.error('内容生成引擎初始化失败:', error);
            throw error;
        }
    }

    /**
     * 智能生成商业计划书
     * 主要接口函数，替代原有的generateContent函数
     */
    async generateBusinessPlan(config) {
        await this.initialize();

        const {
            templateId,
            version,
            customSections = {},
            sectionWeights = {},
            customizations = {},
            options = {}
        } = config;

        // 生成缓存键
        const cacheKey = this.generateCacheKey(config);
        if (this.cache.has(cacheKey) && !options.skipCache) {
            console.log('从缓存获取商业计划书');
            return this.cache.get(cacheKey);
        }

        try {
            // 使用版本化内容系统生成商业计划书
            const businessPlan = await this.versionedContentSystem.generateBusinessPlan(
                templateId,
                customSections
            );

            // 应用权重调整
            if (Object.keys(sectionWeights).length > 0) {
                this.applySectionWeights(businessPlan, sectionWeights);
            }

            // 应用全局自定义
            if (Object.keys(customizations).length > 0) {
                this.applyGlobalCustomizations(businessPlan, customizations);
            }

            // 内容质量优化
            this.contentOptimizer.optimizeBusinessPlan(businessPlan);

            // 缓存结果
            if (!options.skipCache) {
                this.cache.set(cacheKey, businessPlan);
            }

            return businessPlan;

        } catch (error) {
            console.error('生成商业计划书失败:', error);
            throw new Error(`商业计划书生成失败: ${error.message}`);
        }
    }

    /**
     * 生成缓存键
     */
    generateCacheKey(config) {
        const keyData = {
            templateId: config.templateId,
            customSections: config.customSections || {},
            sectionWeights: config.sectionWeights || {},
            customizations: config.customizations || {}
        };
        return btoa(JSON.stringify(keyData)).substring(0, 20);
    }

    /**
     * 应用章节权重
     */
    applySectionWeights(businessPlan, sectionWeights) {
        businessPlan.sections.forEach(section => {
            if (sectionWeights[section.id]) {
                section.weight = sectionWeights[section.id];
                section.content = this.versionedContentSystem.applyWeightAdjustment(
                    section.content,
                    sectionWeights[section.id]
                );
            }
        });

        // 重新排序章节
        businessPlan.sections.sort((a, b) => b.weight - a.weight);
    }

    /**
     * 应用全局自定义
     */
    applyGlobalCustomizations(businessPlan, customizations) {
        // 应用自定义标题
        if (customizations.title) {
            businessPlan.title = customizations.title;
        }

        // 应用自定义公司信息
        if (customizations.companyInfo) {
            this.applyCompanyInfo(businessPlan, customizations.companyInfo);
        }

        // 应用自定义日期
        if (customizations.date) {
            businessPlan.generatedAt = customizations.date;
        }

        // 应用其他全局设置
        if (customizations.globalSettings) {
            this.applyGlobalSettings(businessPlan, customizations.globalSettings);
        }
    }

    /**
     * 应用公司信息
     */
    applyCompanyInfo(businessPlan, companyInfo) {
        // 在所有章节中替换公司信息占位符
        businessPlan.sections.forEach(section => {
            section.content = section.content.replace(
                /\{\{company\.(\w+)\}\}/g,
                (match, key) => companyInfo[key] || match
            );
        });
    }

    /**
     * 应用全局设置
     */
    applyGlobalSettings(businessPlan, globalSettings) {
        // 应用全局样式设置
        if (globalSettings.currency) {
            // 统一货币符号
            businessPlan.sections.forEach(section => {
                section.content = section.content.replace(/¥|元/g, globalSettings.currency);
            });
        }

        if (globalSettings.language) {
            // 应用语言设置
            this.applyLanguageSettings(businessPlan, globalSettings.language);
        }
    }

    /**
     * 应用语言设置
     */
    applyLanguageSettings(businessPlan, language) {
        // 语言适配实现
    }

    /**
     * 生成HTML内容
     * 将商业计划书对象转换为HTML格式
     */
    generateHTMLContent(businessPlan) {
        let html = `
            <div class="business-plan-container" data-version="${businessPlan.version}" data-template="${businessPlan.template}">
                <div class="plan-header">
                    <h1 class="plan-title">${businessPlan.title}</h1>
                    <div class="plan-meta">
                        <span class="plan-version">${this.getVersionName(businessPlan.version)}</span>
                        <span class="plan-date">${new Date(businessPlan.generatedAt).toLocaleDateString('zh-CN')}</span>
                    </div>
                </div>
                <div class="plan-content">
        `;

        // 添加章节内容
        businessPlan.sections.forEach((section, index) => {
            html += `
                <section class="plan-section" data-section-id="${section.id}" data-weight="${section.weight}" data-order="${index + 1}">
                    <div class="section-content">
                        ${section.content}
                    </div>
                </section>
            `;
        });

        html += `
                </div>
                <div class="plan-footer">
                    <p class="generation-info">
                        本商业计划书由千站液冷超充项目智能生成系统自动生成
                        <br>生成时间: ${new Date(businessPlan.generatedAt).toLocaleString('zh-CN')}
                    </p>
                </div>
            </div>
        `;

        return html;
    }

    /**
     * 获取版本名称
     */
    getVersionName(version) {
        const versionConfig = this.versionedContentSystem.getVersionInfo(version);
        return versionConfig ? versionConfig.name : version;
    }

    /**
     * 导出为PDF
     * 集成PDF导出功能
     */
    async exportToPDF(businessPlan, pdfOptions = {}) {
        try {
            // 生成HTML内容
            const htmlContent = this.generateHTMLContent(businessPlan);

            // 使用PDF导出管理器导出
            const pdfBlob = await this.pdfExportManager.exportToPDF(htmlContent, {
                title: businessPlan.title,
                version: businessPlan.version,
                style: this.versionedContentSystem.getVersionInfo(businessPlan.version)?.pdfStyle,
                ...pdfOptions
            });

            return pdfBlob;

        } catch (error) {
            console.error('PDF导出失败:', error);
            throw new Error(`PDF导出失败: ${error.message}`);
        }
    }

    /**
     * 获取可用模板列表
     */
    getAvailableTemplates() {
        return this.versionedContentSystem.getAvailableTemplates();
    }

    /**
     * 获取模板详情
     */
    getTemplateDetails(templateId) {
        const templates = this.getAvailableTemplates();
        return templates.find(t => t.id === templateId);
    }

    /**
     * 预览章节内容
     */
    async previewSection(sectionId, version, weight = 1.0) {
        await this.initialize();

        try {
            const sectionContent = await this.versionedContentSystem.generateSection(
                sectionId,
                version,
                weight
            );

            return {
                id: sectionId,
                title: sectionContent.title,
                content: sectionContent.content,
                weight: weight,
                htmlPreview: this.generateSectionPreview(sectionContent.content)
            };

        } catch (error) {
            console.error(`预览章节失败: ${sectionId}`, error);
            return null;
        }
    }

    /**
     * 生成章节预览
     */
    generateSectionPreview(content) {
        // 截取内容的前500个字符作为预览
        const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        const preview = textContent.substring(0, 500) + (textContent.length > 500 ? '...' : '');
        return preview;
    }

    /**
     * 验证配置
     */
    validateConfig(config) {
        const errors = [];

        if (!config.templateId) {
            errors.push('缺少模板ID');
        } else if (!this.getTemplateDetails(config.templateId)) {
            errors.push('无效的模板ID');
        }

        if (config.sectionWeights) {
            for (const [sectionId, weight] of Object.entries(config.sectionWeights)) {
                if (typeof weight !== 'number' || weight <= 0) {
                    errors.push(`章节权重无效: ${sectionId}`);
                }
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * 获取推荐配置
     */
    getRecommendedConfig(purpose) {
        const recommendations = {
            'investor_pitch': {
                templateId: 'investor-standard',
                sectionWeights: {
                    'financial_analysis': 1.4,
                    'executive_summary': 1.3,
                    'investment_plan': 1.2
                },
                customizations: {
                    title: '千站液冷超充项目投资计划书',
                    globalSettings: {
                        emphasizeReturns: true,
                        includeCharts: true
                    }
                }
            },
            'bank_loan': {
                templateId: 'bank-financing',
                sectionWeights: {
                    'financial_analysis': 1.5,
                    'risk_assessment': 1.4,
                    'investment_plan': 1.3
                },
                customizations: {
                    title: '千站液冷超充项目融资计划书',
                    globalSettings: {
                        emphasizeCashFlow: true,
                        includeCollateral: true
                    }
                }
            },
            'government_application': {
                templateId: 'government-report',
                sectionWeights: {
                    'executive_summary': 1.3,
                    'implementation': 1.2,
                    'social_benefits': 1.4
                },
                customizations: {
                    title: '千站液冷超充项目申请报告',
                    globalSettings: {
                        emphasizeBenefits: true,
                        includePolicyAlignment: true
                    }
                }
            },
            'partnership': {
                templateId: 'partnership',
                sectionWeights: {
                    'technical_solution': 1.5,
                    'market_analysis': 1.3,
                    'cooperation_value': 1.4
                },
                customizations: {
                    title: '千站液冷超充项目合作计划书',
                    globalSettings: {
                        emphasizeAdvantages: true,
                        includeSynergies: true
                    }
                }
            }
        };

        return recommendations[purpose] || recommendations['investor_pitch'];
    }

    /**
     * 清除缓存
     */
    clearCache() {
        this.cache.clear();
        console.log('内容生成引擎缓存已清除');
    }

    /**
     * 获取统计信息
     */
    getStatistics() {
        return {
            isInitialized: this.isInitialized,
            cacheSize: this.cache.size,
            availableTemplates: this.getAvailableTemplates().length,
            supportedVersions: ['investor', 'bank', 'government', 'partner']
        };
    }
}

/**
 * 内容优化器
 */
class ContentOptimizer {
    constructor() {
        this.optimizationRules = new Map();
        this.initializeOptimizationRules();
    }

    initializeOptimizationRules() {
        // 内容一致性优化
        this.optimizationRules.set('consistency', {
            priority: 'high',
            apply: (content) => this.ensureConsistency(content)
        });

        // 内容完整性优化
        this.optimizationRules.set('completeness', {
            priority: 'medium',
            apply: (content) => this.ensureCompleteness(content)
        });

        // 内容可读性优化
        this.optimizationRules.set('readability', {
            priority: 'medium',
            apply: (content) => this.improveReadability(content)
        });
    }

    optimizeBusinessPlan(businessPlan) {
        businessPlan.sections.forEach(section => {
            // 应用所有优化规则
            for (const [ruleName, rule] of this.optimizationRules) {
                try {
                    section.content = rule.apply(section.content);
                } catch (error) {
                    console.warn(`优化规则应用失败: ${ruleName}`, error);
                }
            }
        });
    }

    ensureConsistency(content) {
        // 确保术语一致性
        let optimizedContent = content;

        // 统一数字格式
        optimizedContent = optimizedContent.replace(/(\d+),(\d{3})/g, '$1,$2');

        // 统一日期格式
        optimizedContent = optimizedContent.replace(/\d{4}年\d{1,2}月\d{1,2}日/g, (match) => {
            const date = new Date(match);
            return date.toLocaleDateString('zh-CN');
        });

        return optimizedContent;
    }

    ensureCompleteness(content) {
        // 确保内容完整性
        let optimizedContent = content;

        // 检查是否有未闭合的HTML标签
        // 简单的HTML标签配对检查
        const openTags = content.match(/<[^\/][^>]*>/g) || [];
        const closeTags = content.match(/<\/[^>]+>/g) || [];

        // 这里可以添加更复杂的完整性检查

        return optimizedContent;
    }

    improveReadability(content) {
        // 改善内容可读性
        let optimizedContent = content;

        // 优化段落间距
        optimizedContent = optimizedContent.replace(/<\/p>\s*<p>/g, '</p>\n\n<p>');

        // 优化列表格式
        optimizedContent = optimizedContent.replace(/<li>(.*?)<\/li>/g, '<li>$1</li>\n');

        return optimizedContent;
    }
}

/**
 * PDF导出管理器
 */
class PDFExportManager {
    constructor() {
        this.pdfStyles = new Map();
        this.initializePDFStyles();
    }

    initializePDFStyles() {
        // 投资者版PDF样式
        this.pdfStyles.set('professional-financial', {
            header: {
                backgroundColor: '#1D428A',
                textColor: '#FFFFFF',
                fontSize: '24px',
                padding: '20px'
            },
            body: {
                backgroundColor: '#FFFFFF',
                textColor: '#333333',
                fontSize: '14px',
                lineHeight: '1.6'
            },
            charts: {
                quality: 'high',
                format: 'png'
            }
        });

        // 银行版PDF样式
        this.pdfStyles.set('formal-banking', {
            header: {
                backgroundColor: '#2C3E50',
                textColor: '#FFFFFF',
                fontSize: '22px',
                padding: '25px'
            },
            body: {
                backgroundColor: '#F8F9FA',
                textColor: '#2C3E50',
                fontSize: '13px',
                lineHeight: '1.8'
            },
            charts: {
                quality: 'medium',
                format: 'png'
            }
        });

        // 政府版PDF样式
        this.pdfStyles.set('official-government', {
            header: {
                backgroundColor: '#8B4513',
                textColor: '#FFFFFF',
                fontSize: '20px',
                padding: '30px'
            },
            body: {
                backgroundColor: '#FFFFFF',
                textColor: '#000000',
                fontSize: '14px',
                lineHeight: '1.8'
            },
            charts: {
                quality: 'medium',
                format: 'png'
            }
        });

        // 合作版PDF样式
        this.pdfStyles.set('business-partnership', {
            header: {
                backgroundColor: '#27AE60',
                textColor: '#FFFFFF',
                fontSize: '24px',
                padding: '20px'
            },
            body: {
                backgroundColor: '#FFFFFF',
                textColor: '#2C3E50',
                fontSize: '14px',
                lineHeight: '1.6'
            },
            charts: {
                quality: 'high',
                format: 'png'
            }
        });
    }

    async exportToPDF(htmlContent, options = {}) {
        // 这里集成现有的PDF导出功能
        // 使用浏览器原生打印功能或第三方PDF库

        return new Promise((resolve, reject) => {
            try {
                // 创建临时iframe用于PDF生成
                const iframe = document.createElement('iframe');
                iframe.style.position = 'absolute';
                iframe.style.left = '-9999px';
                document.body.appendChild(iframe);

                const iframeDoc = iframe.contentDocument;
                iframeDoc.open();
                iframeDoc.write(this.wrapHTMLForPDF(htmlContent, options));
                iframeDoc.close();

                // 等待内容加载完成
                iframe.onload = () => {
                    setTimeout(() => {
                        try {
                            // 使用打印功能生成PDF
                            iframe.contentWindow.print();
                            document.body.removeChild(iframe);
                            resolve(new Blob(['PDF generation initiated'], { type: 'application/pdf' }));
                        } catch (error) {
                            document.body.removeChild(iframe);
                            reject(error);
                        }
                    }, 1000);
                };

            } catch (error) {
                reject(error);
            }
        });
    }

    wrapHTMLForPDF(content, options) {
        const style = this.pdfStyles.get(options.style) || this.pdfStyles.get('professional-financial');

        return `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <title>${options.title || '商业计划书'}</title>
                <style>
                    @page {
                        margin: 2cm;
                        size: A4;
                    }

                    body {
                        font-family: 'Microsoft YaHei', 'SimHei', Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        background-color: ${style.body.backgroundColor};
                        color: ${style.body.textColor};
                        font-size: ${style.body.fontSize};
                        line-height: ${style.body.lineHeight};
                    }

                    .plan-header {
                        background-color: ${style.header.backgroundColor};
                        color: ${style.header.textColor};
                        padding: ${style.header.padding};
                        text-align: center;
                        margin-bottom: 30px;
                    }

                    .plan-title {
                        font-size: ${style.header.fontSize};
                        font-weight: bold;
                        margin: 0;
                    }

                    .plan-section {
                        margin-bottom: 30px;
                        page-break-inside: avoid;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 15px 0;
                    }

                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }

                    th {
                        background-color: #f2f2f2;
                        font-weight: bold;
                    }

                    ul, ol {
                        margin: 10px 0;
                        padding-left: 20px;
                    }

                    li {
                        margin: 5px 0;
                    }

                    @media print {
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `;
    }
}

// 导出为全局变量（兼容现有HTML）
window.ContentGenerationEngine = ContentGenerationEngine;
window.ContentOptimizer = ContentOptimizer;
window.PDFExportManager = PDFExportManager;

// 如果支持ES6模块，也导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ContentGenerationEngine,
        ContentOptimizer,
        PDFExportManager
    };
}