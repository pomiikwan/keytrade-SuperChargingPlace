/**
 * 版本化内容管理系统 - 核心架构
 * 实现智能化商业计划书生成器的内容版本化和自适应功能
 *
 * 功能特性：
 * - 4种专业化版本内容适配
 * - 智能章节组合和权重调整
 * - 内容质量验证和优化
 * - 与现有JS内容模块无缝集成
 */

class VersionedContentSystem {
    constructor() {
        this.contentModules = new Map(); // 内容模块缓存
        this.versionConfigs = new Map(); // 版本配置缓存
        this.templateConfigs = new Map(); // 模板配置缓存
        this.contentCache = new Map(); // 生成内容缓存

        this.initializeVersionConfigs();
        this.initializeTemplateConfigs();
    }

    /**
     * 初始化版本配置
     * 定义4种专业化版本的内容重点和适配规则
     */
    initializeVersionConfigs() {
        // 投资者版配置
        this.versionConfigs.set('investor', {
            name: '投资者版',
            focus: '财务回报、投资亮点、风险评估、退出机制',
            adaptations: {
                terminology: '金融专业术语',
                dataPriority: ['IRR', 'NPV', '回收期', 'ROI', '现金流'],
                tone: '专业、客观、数据驱动',
                sections: {
                    high: ['财务分析', '投资方案', '风险评估'],
                    medium: ['市场分析', '项目概述'],
                    low: ['技术方案细节']
                },
                contentFilters: {
                    highlightFinancialMetrics: true,
                    emphasizeInvestmentReturns: true,
                    includeRiskAssessment: true,
                    showExitStrategies: true,
                    detailTechnicalSpecs: false
                }
            },
            pdfStyle: 'professional-financial'
        });

        // 银行机构版配置
        this.versionConfigs.set('bank', {
            name: '银行机构版',
            focus: '现金流分析、还款能力、抵押资产、风险控制',
            adaptations: {
                terminology: '银行专业术语',
                dataPriority: ['现金流', 'EBITDA', '债务比率', '还款能力', '抵押物'],
                tone: '严谨、稳健、风险导向',
                sections: {
                    high: ['财务分析', '风险评估', '投资方案'],
                    medium: ['市场分析', '项目概述'],
                    low: ['技术方案细节']
                },
                contentFilters: {
                    highlightCashFlow: true,
                    emphasizeDebtService: true,
                    includeCollateralAnalysis: true,
                    showRiskMitigation: true,
                    detailInvestorReturns: false
                }
            },
            pdfStyle: 'formal-banking'
        });

        // 政府申报版配置
        this.versionConfigs.set('government', {
            name: '政府申报版',
            focus: '政策符合性、社会效益、产业贡献、就业创造',
            adaptations: {
                terminology: '政策专业术语',
                dataPriority: ['就业数据', '碳减排', '产业贡献', '政策符合度', '社会效益'],
                tone: '正式、规范、社会价值导向',
                sections: {
                    high: ['项目概述', '市场分析', '社会效益'],
                    medium: ['技术方案', '投资方案'],
                    low: ['财务回报细节']
                },
                contentFilters: {
                    highlightPolicyAlignment: true,
                    emphasizeSocialBenefits: true,
                    includeEmploymentImpact: true,
                    showEnvironmentalBenefits: true,
                    detailFinancialReturns: false
                }
            },
            pdfStyle: 'official-government'
        });

        // 合作洽谈版配置
        this.versionConfigs.set('partner', {
            name: '合作洽谈版',
            focus: '技术优势、商业模式、合作价值、共赢机制',
            adaptations: {
                terminology: '商业合作术语',
                dataPriority: ['技术优势', '市场机会', '合作价值', '竞争优势', '增长潜力'],
                tone: '前瞻、合作、商业价值导向',
                sections: {
                    high: ['技术方案', '市场分析', '合作价值'],
                    medium: ['项目概述', '投资方案'],
                    low: ['财务细节', '风险评估']
                },
                contentFilters: {
                    highlightTechnicalAdvantages: true,
                    emphasizeMarketOpportunities: true,
                    includeCooperationValue: true,
                    showCompetitiveAdvantages: true,
                    detailFinancialRisks: false
                }
            },
            pdfStyle: 'business-partnership'
        });
    }

    /**
     * 初始化模板配置
     * 定义预设模板的章节组合和权重配置
     */
    initializeTemplateConfigs() {
        // 投资者标准版模板
        this.templateConfigs.set('investor-standard', {
            name: '投资者标准版',
            version: 'investor',
            sections: [
                { id: 'executive_summary', weight: 1.2, enabled: true },
                { id: 'market_analysis', weight: 1.0, enabled: true },
                { id: 'technical_solution', weight: 0.8, enabled: true },
                { id: 'financial_analysis', weight: 1.3, enabled: true },
                { id: 'investment_plan', weight: 1.2, enabled: true },
                { id: 'risk_assessment', weight: 1.1, enabled: true },
                { id: 'team_introduction', weight: 0.9, enabled: true },
                { id: 'implementation', weight: 0.7, enabled: true }
            ],
            customizationLevel: 'low'
        });

        // 银行融资版模板
        this.templateConfigs.set('bank-financing', {
            name: '银行融资版',
            version: 'bank',
            sections: [
                { id: 'executive_summary', weight: 1.0, enabled: true },
                { id: 'market_analysis', weight: 0.9, enabled: true },
                { id: 'financial_analysis', weight: 1.4, enabled: true },
                { id: 'investment_plan', weight: 1.3, enabled: true },
                { id: 'risk_assessment', weight: 1.3, enabled: true }
            ],
            customizationLevel: 'low'
        });

        // 政府申报版模板
        this.templateConfigs.set('government-report', {
            name: '政府申报版',
            version: 'government',
            sections: [
                { id: 'executive_summary', weight: 1.2, enabled: true },
                { id: 'market_analysis', weight: 1.1, enabled: true },
                { id: 'technical_solution', weight: 1.0, enabled: true },
                { id: 'financial_analysis', weight: 0.8, enabled: true },
                { id: 'implementation', weight: 1.2, enabled: true },
                { id: 'team_introduction', weight: 1.0, enabled: true },
                { id: 'social_benefits', weight: 1.3, enabled: true }
            ],
            customizationLevel: 'medium'
        });

        // 合作洽谈版模板
        this.templateConfigs.set('partnership', {
            name: '合作洽谈版',
            version: 'partner',
            sections: [
                { id: 'executive_summary', weight: 1.1, enabled: true },
                { id: 'market_analysis', weight: 1.2, enabled: true },
                { id: 'technical_solution', weight: 1.4, enabled: true },
                { id: 'financial_analysis', weight: 0.9, enabled: true },
                { id: 'investment_plan', weight: 1.0, enabled: true },
                { id: 'cooperation_value', weight: 1.3, enabled: true }
            ],
            customizationLevel: 'medium'
        });

        // 快速概览版模板
        this.templateConfigs.set('quick-overview', {
            name: '快速概览版',
            version: 'investor',
            sections: [
                { id: 'executive_summary', weight: 1.5, enabled: true },
                { id: 'market_analysis', weight: 1.0, enabled: true },
                { id: 'financial_analysis', weight: 1.2, enabled: true },
                { id: 'investment_plan', weight: 1.1, enabled: true }
            ],
            customizationLevel: 'low'
        });

        // 详细分析版模板
        this.templateConfigs.set('detailed-analysis', {
            name: '详细分析版',
            version: 'investor',
            sections: [
                { id: 'executive_summary', weight: 1.0, enabled: true },
                { id: 'market_analysis', weight: 1.1, enabled: true },
                { id: 'technical_solution', weight: 1.1, enabled: true },
                { id: 'financial_analysis', weight: 1.2, enabled: true },
                { id: 'investment_plan', weight: 1.1, enabled: true },
                { id: 'risk_assessment', weight: 1.1, enabled: true },
                { id: 'team_introduction', weight: 1.0, enabled: true },
                { id: 'implementation', weight: 1.0, enabled: true },
                { id: 'appendix', weight: 0.8, enabled: true },
                { id: 'references', weight: 0.6, enabled: true }
            ],
            customizationLevel: 'high'
        });
    }

    /**
     * 加载内容模块
     * 从现有的JavaScript内容模块系统加载内容
     */
    async loadContentModules() {
        const moduleFiles = [
            'executive_summary_content.js',
            'market_analysis_content.js',
            'technical_solution_content.js',
            'financial_analysis_content.js',
            'financing_plan_content.js',
            'risk_assessment_content.js',
            'team_introduction_content.js',
            'implementation_content.js',
            'content_overview_content.js'
        ];

        for (const file of moduleFiles) {
            try {
                await this.loadScript(`js/${file}`);
                console.log(`已加载内容模块: ${file}`);
            } catch (error) {
                console.warn(`加载内容模块失败: ${file}`, error);
            }
        }
    }

    /**
     * 动态加载JavaScript文件
     */
    loadScript(src) {
        return new Promise((resolve, reject) => {
            // 检查是否已经加载过
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * 获取内容模块
     * 根据模块ID获取对应的内容和元数据
     */
    getContentModule(moduleId) {
        // 尝试从全局变量获取
        const contentVarName = moduleId.toUpperCase() + '_CONTENT';
        const metaVarName = moduleId.toUpperCase() + '_META';
        const loadFuncName = 'load' + moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

        if (window[contentVarName] && window[metaVarName] && window[loadFuncName]) {
            return {
                content: window[contentVarName],
                meta: window[metaVarName],
                loadFunction: window[loadFuncName]
            };
        }

        return null;
    }

    /**
     * 版本化内容适配
     * 根据版本配置对内容进行专业化适配
     */
    adaptContentToVersion(content, version) {
        const versionConfig = this.versionConfigs.get(version);
        if (!versionConfig) {
            console.warn(`未找到版本配置: ${version}`);
            return content;
        }

        let adaptedContent = content;

        // 应用术语适配
        adaptedContent = this.adaptTerminology(adaptedContent, versionConfig);

        // 应用数据重点适配
        adaptedContent = this.adaptDataPriority(adaptedContent, versionConfig);

        // 应用内容过滤
        adaptedContent = this.applyContentFilters(adaptedContent, versionConfig);

        // 应用语气适配
        adaptedContent = this.adaptTone(adaptedContent, versionConfig);

        return adaptedContent;
    }

    /**
     * 术语适配
     */
    adaptTerminology(content, versionConfig) {
        const terminologyMap = this.getTerminologyMap(versionConfig.adaptations.terminology);

        let adaptedContent = content;
        for (const [original, replacement] of Object.entries(terminologyMap)) {
            const regex = new RegExp(original, 'g');
            adaptedContent = adaptedContent.replace(regex, replacement);
        }

        return adaptedContent;
    }

    /**
     * 获取术语映射表
     */
    getTerminologyMap(terminologyType) {
        const terminologyMaps = {
            '金融专业术语': {
                '利润': '收益',
                '收入': '营业收入',
                '成本': '费用支出',
                '投资': '资本投入',
                '回报': '投资回报',
                '风险': '投资风险',
                '收益': '投资收益'
            },
            '银行专业术语': {
                '收入': '现金流收入',
                '利润': '净现金流',
                '投资': '融资项目',
                '回报': '还款能力',
                '风险': '信贷风险',
                '资产': '抵押资产'
            },
            '政策专业术语': {
                '项目': '示范项目',
                '投资': '财政投入',
                '收入': '经济效益',
                '就业': '就业岗位创造',
                '环保': '环境效益',
                '发展': '可持续发展'
            },
            '商业合作术语': {
                '投资': '合作投入',
                '收入': '合作收益',
                '利润': '合作利润',
                '风险': '合作风险',
                '优势': '合作优势',
                '发展': '合作发展'
            }
        };

        return terminologyMaps[terminologyType] || {};
    }

    /**
     * 数据重点适配
     */
    adaptDataPriority(content, versionConfig) {
        // 根据版本配置调整数据展示的优先级和重点
        const dataPriority = versionConfig.adaptations.dataPriority;

        // 这里可以添加更复杂的数据适配逻辑
        // 例如突出显示关键指标、调整表格顺序等

        return content;
    }

    /**
     * 内容过滤
     */
    applyContentFilters(content, versionConfig) {
        const filters = versionConfig.adaptations.contentFilters;

        // 根据过滤条件调整内容
        if (filters.detailTechnicalSpecs === false) {
            // 简化技术细节
            content = this.simplifyTechnicalDetails(content);
        }

        if (filters.detailFinancialReturns === false) {
            // 简化财务回报细节
            content = this.simplifyFinancialDetails(content);
        }

        return content;
    }

    /**
     * 语气适配
     */
    adaptTone(content, versionConfig) {
        const tone = versionConfig.adaptations.tone;

        // 根据语气类型调整表达方式
        const toneAdaptations = {
            '专业、客观、数据驱动': {
                '我觉得': '根据分析',
                '可能': '预期',
                '大概': '约',
                '很好': '优异'
            },
            '严谨、稳健、风险导向': {
                '优势': '相对优势',
                '成功': '可达成目标',
                '高': '较高',
                '强': '较强'
            },
            '正式、规范、社会价值导向': {
                '我们': '本项目',
                '公司': '项目实施单位',
                '业务': '项目实施内容',
                '客户': '服务对象'
            },
            '前瞻、合作、商业价值导向': {
                '问题': '机遇',
                '挑战': '发展空间',
                '成本': '投入',
                '销售': '市场拓展'
            }
        };

        const adaptations = toneAdaptations[tone] || {};
        let adaptedContent = content;

        for (const [original, replacement] of Object.entries(adaptations)) {
            const regex = new RegExp(original, 'g');
            adaptedContent = adaptedContent.replace(regex, replacement);
        }

        return adaptedContent;
    }

    /**
     * 生成版本化商业计划书
     * 主要接口函数，根据模板配置和版本生成完整的商业计划书
     */
    async generateBusinessPlan(templateId, customizations = {}) {
        // 获取模板配置
        const templateConfig = this.templateConfigs.get(templateId);
        if (!templateConfig) {
            throw new Error(`未找到模板配置: ${templateId}`);
        }

        // 获取版本配置
        const versionConfig = this.versionConfigs.get(templateConfig.version);
        if (!versionConfig) {
            throw new Error(`未找到版本配置: ${templateConfig.version}`);
        }

        // 确保内容模块已加载
        await this.loadContentModules();

        // 生成内容
        const businessPlan = {
            title: `千站液冷超充项目商业计划书 - ${versionConfig.name}`,
            version: templateConfig.version,
            template: templateId,
            generatedAt: new Date().toISOString(),
            sections: []
        };

        // 按权重顺序生成章节内容
        const enabledSections = templateConfig.sections
            .filter(section => section.enabled)
            .sort((a, b) => b.weight - a.weight);

        for (const sectionConfig of enabledSections) {
            const sectionContent = await this.generateSection(
                sectionConfig.id,
                templateConfig.version,
                sectionConfig.weight,
                customizations[sectionConfig.id]
            );

            if (sectionContent) {
                businessPlan.sections.push({
                    id: sectionConfig.id,
                    title: sectionContent.title,
                    content: sectionContent.content,
                    weight: sectionConfig.weight,
                    order: businessPlan.sections.length + 1
                });
            }
        }

        return businessPlan;
    }

    /**
     * 生成章节内容
     */
    async generateSection(sectionId, version, weight = 1.0, customConfig = {}) {
        // 获取原始内容模块
        const module = this.getContentModule(sectionId);
        if (!module) {
            console.warn(`未找到内容模块: ${sectionId}`);
            return null;
        }

        // 调用内容加载函数
        const originalContent = module.loadFunction();
        if (!originalContent) {
            console.warn(`无法加载章节内容: ${sectionId}`);
            return null;
        }

        // 版本化适配
        const adaptedContent = this.adaptContentToVersion(originalContent, version);

        // 应用权重调整（内容长度和详细程度）
        const weightedContent = this.applyWeightAdjustment(adaptedContent, weight);

        // 应用自定义配置
        const customizedContent = this.applyCustomization(weightedContent, customConfig);

        return {
            title: this.extractTitle(originalContent),
            content: customizedContent
        };
    }

    /**
     * 提取标题
     */
    extractTitle(content) {
        const titleMatch = content.match(/<h1[^>]*>(.*?)<\/h1>/);
        return titleMatch ? titleMatch[1] : '未命名章节';
    }

    /**
     * 权重调整
     * 根据权重调整内容的详细程度
     */
    applyWeightAdjustment(content, weight) {
        if (weight === 1.0) return content;

        if (weight > 1.0) {
            // 增加详细程度 - 可以扩展内容、添加更多数据等
            return this.expandContent(content, weight);
        } else {
            // 减少详细程度 - 可以精简内容、移除次要信息等
            return this.condenseContent(content, weight);
        }
    }

    /**
     * 扩展内容
     */
    expandContent(content, weight) {
        // 根据权重倍数扩展内容
        // 这里可以添加更多细节、数据点、分析等
        return content; // 暂时返回原内容
    }

    /**
     * 精简内容
     */
    condenseContent(content, weight) {
        // 根据权重精简内容
        // 可以移除次要段落、简化表格等
        return content; // 暂时返回原内容
    }

    /**
     * 应用自定义配置
     */
    applyCustomization(content, customConfig) {
        if (!customConfig || Object.keys(customConfig).length === 0) {
            return content;
        }

        let customizedContent = content;

        // 应用自定义标题
        if (customConfig.title) {
            customizedContent = customizedContent.replace(
                /<h1[^>]*>.*?<\/h1>/,
                `<h1>${customConfig.title}</h1>`
            );
        }

        // 应用自定义内容重点
        if (customConfig.focus) {
            customizedContent = this.adjustContentFocus(customizedContent, customConfig.focus);
        }

        // 应用自定义长度
        if (customConfig.length) {
            customizedContent = this.adjustContentLength(customizedContent, customConfig.length);
        }

        return customizedContent;
    }

    /**
     * 调整内容重点
     */
    adjustContentFocus(content, focus) {
        // 根据用户指定的重点调整内容
        return content;
    }

    /**
     * 调整内容长度
     */
    adjustContentLength(content, length) {
        // 根据用户指定的长度调整内容
        return content;
    }

    /**
     * 简化技术细节
     */
    simplifyTechnicalDetails(content) {
        // 简化技术细节的实现
        return content;
    }

    /**
     * 简化财务细节
     */
    simplifyFinancialDetails(content) {
        // 简化财务细节的实现
        return content;
    }

    /**
     * 获取可用的模板列表
     */
    getAvailableTemplates() {
        return Array.from(this.templateConfigs.entries()).map(([id, config]) => ({
            id,
            name: config.name,
            version: config.version,
            sectionCount: config.sections.filter(s => s.enabled).length,
            customizationLevel: config.customizationLevel
        }));
    }

    /**
     * 获取版本信息
     */
    getVersionInfo(version) {
        return this.versionConfigs.get(version);
    }

    /**
     * 内容质量验证
     */
    validateContentQuality(content) {
        const issues = [];

        // 检查内容长度
        if (content.length < 100) {
            issues.push('内容过短');
        }

        // 检查HTML结构
        if (!content.includes('<h1') && !content.includes('<h2')) {
            issues.push('缺少标题结构');
        }

        // 检查关键元素
        if (!content.includes('<p') && !content.includes('<ul')) {
            issues.push('缺少正文内容');
        }

        return {
            isValid: issues.length === 0,
            issues,
            score: Math.max(0, 100 - issues.length * 20)
        };
    }
}

// 导出为全局变量（兼容现有HTML）
window.VersionedContentSystem = VersionedContentSystem;

// 如果支持ES6模块，也导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VersionedContentSystem;
}