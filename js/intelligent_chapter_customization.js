/**
 * 智能章节定制系统
 * 提供预设模板管理和章节自定义功能
 */

class IntelligentChapterCustomization {
    constructor() {
        this.templateManager = new TemplateManager();
        this.chapterSelector = new ChapterSelector();
        this.weightAdjuster = new WeightAdjuster();
        // ContentOptimizer在content_generation_engine.js中定义
        this.previewGenerator = new PreviewGenerator();
    }

    /**
     * 获取可用的预设模板
     */
    getAvailableTemplates() {
        return this.templateManager.getTemplates();
    }

    /**
     * 获取模板详情
     */
    getTemplateDetails(templateId) {
        return this.templateManager.getTemplate(templateId);
    }

    /**
     * 选择模板
     */
    selectTemplate(templateId) {
        const template = this.templateManager.getTemplate(templateId);
        if (!template) {
            throw new Error(`模板不存在: ${templateId}`);
        }
        return this.chapterSelector.createConfigurationFromTemplate(template);
    }

    /**
     * 自定义章节配置
     */
    customizeChapter(configuration, chapterId, customizations) {
        return this.chapterSelector.customizeChapter(configuration, chapterId, customizations);
    }

    /**
     * 调整章节权重
     */
    adjustChapterWeight(configuration, chapterId, weight) {
        return this.weightAdjuster.adjustWeight(configuration, chapterId, weight);
    }

    /**
     * 预览配置结果
     */
    async previewConfiguration(configuration) {
        return await this.previewGenerator.generatePreview(configuration);
    }

    /**
     * 验证配置
     */
    validateConfiguration(configuration) {
        return this.chapterSelector.validateConfiguration(configuration);
    }
}

/**
 * 模板管理器
 */
class TemplateManager {
    constructor() {
        this.templates = new Map();
        this.initializeTemplates();
    }

    initializeTemplates() {
        // 投资者标准版模板
        this.templates.set('investor-standard', {
            id: 'investor-standard',
            name: '投资者标准版',
            description: '针对投资者的标准商业计划书模板，包含8个核心章节',
            version: 'investor',
            sections: [
                { id: 'executive_summary', name: '执行摘要', weight: 1.2, enabled: true, required: true },
                { id: 'market_analysis', name: '市场分析', weight: 1.0, enabled: true, required: true },
                { id: 'technical_solution', name: '技术方案', weight: 0.8, enabled: true, required: false },
                { id: 'financial_analysis', name: '财务分析', weight: 1.3, enabled: true, required: true },
                { id: 'investment_plan', name: '投资方案', weight: 1.2, enabled: true, required: true },
                { id: 'risk_assessment', name: '风险评估', weight: 1.1, enabled: true, required: true },
                { id: 'team_introduction', name: '团队介绍', weight: 0.9, enabled: true, required: false },
                { id: 'implementation', name: '实施计划', weight: 0.7, enabled: true, required: false }
            ],
            customizationLevel: 'low',
            estimatedPages: 15,
            estimatedReadingTime: '10分钟'
        });

        // 银行融资版模板
        this.templates.set('bank-financing', {
            id: 'bank-financing',
            name: '银行融资版',
            description: '针对银行融资需求的专用模板，重点关注现金流和风险控制',
            version: 'bank',
            sections: [
                { id: 'executive_summary', name: '执行摘要', weight: 1.0, enabled: true, required: true },
                { id: 'market_analysis', name: '市场分析', weight: 0.9, enabled: true, required: true },
                { id: 'financial_analysis', name: '财务分析', weight: 1.4, enabled: true, required: true },
                { id: 'investment_plan', name: '投资方案', weight: 1.3, enabled: true, required: true },
                { id: 'risk_assessment', name: '风险评估', weight: 1.3, enabled: true, required: true }
            ],
            customizationLevel: 'low',
            estimatedPages: 12,
            estimatedReadingTime: '8分钟'
        });

        // 政府申报版模板
        this.templates.set('government-report', {
            id: 'government-report',
            name: '政府申报版',
            description: '针对政府申报的专用模板，突出政策符合性和社会效益',
            version: 'government',
            sections: [
                { id: 'executive_summary', name: '执行摘要', weight: 1.2, enabled: true, required: true },
                { id: 'market_analysis', name: '市场分析', weight: 1.1, enabled: true, required: true },
                { id: 'technical_solution', name: '技术方案', weight: 1.0, enabled: true, required: true },
                { id: 'financial_analysis', name: '财务分析', weight: 0.8, enabled: true, required: false },
                { id: 'implementation', name: '实施计划', weight: 1.2, enabled: true, required: true },
                { id: 'team_introduction', name: '团队介绍', weight: 1.0, enabled: true, required: false },
                { id: 'social_benefits', name: '社会效益', weight: 1.3, enabled: true, required: true }
            ],
            customizationLevel: 'medium',
            estimatedPages: 18,
            estimatedReadingTime: '12分钟'
        });

        // 合作洽谈版模板
        this.templates.set('partnership', {
            id: 'partnership',
            name: '合作洽谈版',
            description: '针对商业合作的专用模板，突出技术优势和合作价值',
            version: 'partner',
            sections: [
                { id: 'executive_summary', name: '执行摘要', weight: 1.1, enabled: true, required: true },
                { id: 'market_analysis', name: '市场分析', weight: 1.2, enabled: true, required: true },
                { id: 'technical_solution', name: '技术方案', weight: 1.4, enabled: true, required: true },
                { id: 'financial_analysis', name: '财务分析', weight: 0.9, enabled: true, required: false },
                { id: 'investment_plan', name: '投资方案', weight: 1.0, enabled: true, required: true },
                { id: 'cooperation_value', name: '合作价值', weight: 1.3, enabled: true, required: true }
            ],
            customizationLevel: 'medium',
            estimatedPages: 16,
            estimatedReadingTime: '11分钟'
        });

        // 快速概览版模板
        this.templates.set('quick-overview', {
            id: 'quick-overview',
            name: '快速概览版',
            description: '简洁版商业计划书，适合快速了解项目核心价值',
            version: 'investor',
            sections: [
                { id: 'executive_summary', name: '执行摘要', weight: 1.5, enabled: true, required: true },
                { id: 'market_analysis', name: '市场分析', weight: 1.0, enabled: true, required: true },
                { id: 'financial_analysis', name: '财务分析', weight: 1.2, enabled: true, required: true },
                { id: 'investment_plan', name: '投资方案', weight: 1.1, enabled: true, required: true }
            ],
            customizationLevel: 'low',
            estimatedPages: 8,
            estimatedReadingTime: '5分钟'
        });

        // 详细分析版模板
        this.templates.set('detailed-analysis', {
            id: 'detailed-analysis',
            name: '详细分析版',
            description: '完整版商业计划书，包含详细的技术和财务分析',
            version: 'investor',
            sections: [
                { id: 'executive_summary', name: '执行摘要', weight: 1.0, enabled: true, required: true },
                { id: 'market_analysis', name: '市场分析', weight: 1.1, enabled: true, required: true },
                { id: 'technical_solution', name: '技术方案', weight: 1.1, enabled: true, required: true },
                { id: 'financial_analysis', name: '财务分析', weight: 1.2, enabled: true, required: true },
                { id: 'investment_plan', name: '投资方案', weight: 1.1, enabled: true, required: true },
                { id: 'risk_assessment', name: '风险评估', weight: 1.1, enabled: true, required: true },
                { id: 'team_introduction', name: '团队介绍', weight: 1.0, enabled: true, required: false },
                { id: 'implementation', name: '实施计划', weight: 1.0, enabled: true, required: false },
                { id: 'appendix', name: '附录', weight: 0.8, enabled: true, required: false },
                { id: 'references', name: '参考文献', weight: 0.6, enabled: true, required: false }
            ],
            customizationLevel: 'high',
            estimatedPages: 25,
            estimatedReadingTime: '18分钟'
        });
    }

    getTemplates() {
        return Array.from(this.templates.values()).map(template => ({
            id: template.id,
            name: template.name,
            description: template.description,
            version: template.version,
            sectionCount: template.sections.filter(s => s.enabled).length,
            customizationLevel: template.customizationLevel,
            estimatedPages: template.estimatedPages,
            estimatedReadingTime: template.estimatedReadingTime
        }));
    }

    getTemplate(templateId) {
        return this.templates.get(templateId);
    }

    addTemplate(template) {
        this.templates.set(template.id, template);
    }

    updateTemplate(templateId, updates) {
        const template = this.templates.get(templateId);
        if (template) {
            Object.assign(template, updates);
            return template;
        }
        return null;
    }
}

/**
 * 章节选择器
 */
class ChapterSelector {
    constructor() {
        this.availableChapters = new Map();
        this.initializeAvailableChapters();
    }

    initializeAvailableChapters() {
        const chapters = [
            {
                id: 'executive_summary',
                name: '执行摘要',
                description: '项目核心要点和投资亮点的概述',
                estimatedLength: '2-3页',
                complexity: 'medium',
                dependencies: []
            },
            {
                id: 'market_analysis',
                name: '市场分析',
                description: '市场环境、竞争格局和发展趋势分析',
                estimatedLength: '3-4页',
                complexity: 'high',
                dependencies: []
            },
            {
                id: 'technical_solution',
                name: '技术方案',
                description: '技术路线、核心优势和实施方案',
                estimatedLength: '4-5页',
                complexity: 'high',
                dependencies: []
            },
            {
                id: 'financial_analysis',
                name: '财务分析',
                description: '投资回报、现金流和盈利能力分析',
                estimatedLength: '5-6页',
                complexity: 'high',
                dependencies: []
            },
            {
                id: 'investment_plan',
                name: '投资方案',
                description: '投资规模、资金来源和使用计划',
                estimatedLength: '2-3页',
                complexity: 'medium',
                dependencies: ['financial_analysis']
            },
            {
                id: 'risk_assessment',
                name: '风险评估',
                description: '风险识别、量化分析和应对措施',
                estimatedLength: '3-4页',
                complexity: 'high',
                dependencies: ['financial_analysis', 'market_analysis']
            },
            {
                id: 'team_introduction',
                name: '团队介绍',
                description: '核心团队背景和专业能力介绍',
                estimatedLength: '1-2页',
                complexity: 'low',
                dependencies: []
            },
            {
                id: 'implementation',
                name: '实施计划',
                description: '项目实施的时间表和里程碑',
                estimatedLength: '2-3页',
                complexity: 'medium',
                dependencies: ['investment_plan']
            },
            {
                id: 'cooperation_value',
                name: '合作价值',
                description: '合作模式、价值分配和共赢机制',
                estimatedLength: '2-3页',
                complexity: 'medium',
                dependencies: ['market_analysis', 'technical_solution']
            },
            {
                id: 'social_benefits',
                name: '社会效益',
                description: '社会价值、环境效益和产业贡献',
                estimatedLength: '2-3页',
                complexity: 'medium',
                dependencies: ['implementation']
            },
            {
                id: 'appendix',
                name: '附录',
                description: '补充材料、详细数据和技术文档',
                estimatedLength: '3-5页',
                complexity: 'low',
                dependencies: []
            },
            {
                id: 'references',
                name: '参考文献',
                description: '参考资料和数据来源',
                estimatedLength: '1页',
                complexity: 'low',
                dependencies: []
            }
        ];

        chapters.forEach(chapter => {
            this.availableChapters.set(chapter.id, chapter);
        });
    }

    createConfigurationFromTemplate(template) {
        return {
            templateId: template.id,
            templateName: template.name,
            version: template.version,
            sections: template.sections.map(section => ({
                ...section,
                customTitle: null,
                customFocus: null,
                customLength: null
            })),
            customizations: {},
            createdAt: new Date().toISOString()
        };
    }

    customizeChapter(configuration, chapterId, customizations) {
        const section = configuration.sections.find(s => s.id === chapterId);
        if (!section) {
            throw new Error(`章节不存在: ${chapterId}`);
        }

        if (customizations.title) {
            section.customTitle = customizations.title;
        }

        if (customizations.focus) {
            section.customFocus = customizations.focus;
        }

        if (customizations.length) {
            section.customLength = customizations.length;
        }

        if (customizations.enabled !== undefined) {
            section.enabled = customizations.enabled;
        }

        return configuration;
    }

    addChapter(configuration, chapterId, position = null) {
        const chapter = this.availableChapters.get(chapterId);
        if (!chapter) {
            throw new Error(`章节不存在: ${chapterId}`);
        }

        const newSection = {
            id: chapter.id,
            name: chapter.name,
            weight: 1.0,
            enabled: true,
            required: false,
            customTitle: null,
            customFocus: null,
            customLength: null
        };

        if (position !== null && position >= 0 && position <= configuration.sections.length) {
            configuration.sections.splice(position, 0, newSection);
        } else {
            configuration.sections.push(newSection);
        }

        return configuration;
    }

    removeChapter(configuration, chapterId) {
        const sectionIndex = configuration.sections.findIndex(s => s.id === chapterId);
        if (sectionIndex === -1) {
            throw new Error(`章节不存在: ${chapterId}`);
        }

        const section = configuration.sections[sectionIndex];
        if (section.required) {
            throw new Error(`不能删除必需章节: ${chapterId}`);
        }

        configuration.sections.splice(sectionIndex, 1);
        return configuration;
    }

    reorderChapter(configuration, chapterId, newPosition) {
        const sectionIndex = configuration.sections.findIndex(s => s.id === chapterId);
        if (sectionIndex === -1) {
            throw new Error(`章节不存在: ${chapterId}`);
        }

        const section = configuration.sections[sectionIndex];
        configuration.sections.splice(sectionIndex, 1);
        configuration.sections.splice(newPosition, 0, section);

        return configuration;
    }

    validateConfiguration(configuration) {
        const errors = [];
        const warnings = [];

        // 检查必需章节
        const requiredSections = configuration.sections.filter(s => s.required);
        const enabledRequiredSections = requiredSections.filter(s => s.enabled);

        if (enabledRequiredSections.length < requiredSections.length) {
            errors.push('缺少必需章节');
        }

        // 检查章节数量
        const enabledSections = configuration.sections.filter(s => s.enabled);
        if (enabledSections.length < 3) {
            warnings.push('章节数量过少，可能影响完整性');
        }

        if (enabledSections.length > 12) {
            warnings.push('章节数量过多，可能影响阅读体验');
        }

        // 检查依赖关系
        for (const section of enabledSections) {
            const chapter = this.availableChapters.get(section.id);
            if (chapter) {
                for (const dependency of chapter.dependencies) {
                    const dependencyExists = enabledSections.some(s => s.id === dependency);
                    if (!dependencyExists) {
                        warnings.push(`章节"${chapter.name}"依赖的章节"${dependency}"未启用`);
                    }
                }
            }
        }

        // 检查权重合理性
        const weights = enabledSections.map(s => s.weight);
        const maxWeight = Math.max(...weights);
        const minWeight = Math.min(...weights);

        if (maxWeight > 3.0) {
            warnings.push('部分章节权重过高，可能导致内容过长');
        }

        if (minWeight < 0.3) {
            warnings.push('部分章节权重过低，可能导致内容过短');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings,
            score: Math.max(0, 100 - (errors.length * 20) - (warnings.length * 5))
        };
    }

    getAvailableChapters() {
        return Array.from(this.availableChapters.values());
    }
}

/**
 * 权重调整器
 */
class WeightAdjuster {
    adjustWeight(configuration, chapterId, weight) {
        if (weight <= 0 || weight > 3.0) {
            throw new Error('权重必须在0-3.0之间');
        }

        const section = configuration.sections.find(s => s.id === chapterId);
        if (!section) {
            throw new Error(`章节不存在: ${chapterId}`);
        }

        section.weight = weight;
        return configuration;
    }

    adjustAllWeights(configuration, weights) {
        for (const [chapterId, weight] of Object.entries(weights)) {
            this.adjustWeight(configuration, chapterId, weight);
        }
        return configuration;
    }

    normalizeWeights(configuration) {
        const enabledSections = configuration.sections.filter(s => s.enabled);
        if (enabledSections.length === 0) return configuration;

        const totalWeight = enabledSections.reduce((sum, s) => sum + s.weight, 0);
        const targetWeight = enabledSections.length; // 平均权重为1.0

        if (totalWeight === 0) return configuration;

        const scaleFactor = targetWeight / totalWeight;

        enabledSections.forEach(section => {
            section.weight *= scaleFactor;
        });

        return configuration;
    }

    getWeightRecommendations(configuration, purpose) {
        const recommendations = {
            'investor_focus': {
                'financial_analysis': 1.4,
                'executive_summary': 1.3,
                'investment_plan': 1.2,
                'risk_assessment': 1.1
            },
            'bank_focus': {
                'financial_analysis': 1.5,
                'risk_assessment': 1.4,
                'investment_plan': 1.3,
                'executive_summary': 1.0
            },
            'government_focus': {
                'executive_summary': 1.3,
                'implementation': 1.2,
                'social_benefits': 1.4,
                'market_analysis': 1.1
            },
            'partner_focus': {
                'technical_solution': 1.5,
                'market_analysis': 1.3,
                'cooperation_value': 1.4,
                'executive_summary': 1.1
            }
        };

        return recommendations[purpose] || {};
    }
}

// ContentOptimizer类在content_generation_engine.js中定义，这里不再重复定义

/**
 * 预览生成器
 */
class PreviewGenerator {
    async generatePreview(configuration) {
        const preview = {
            configuration: configuration,
            outline: this.generateOutline(configuration),
            statistics: this.generateStatistics(configuration),
            recommendations: this.generateRecommendations(configuration)
        };

        return preview;
    }

    generateOutline(configuration) {
        const enabledSections = configuration.sections.filter(s => s.enabled);

        return enabledSections.map((section, index) => {
            const chapter = this.getChapterInfo(section.id);
            return {
                order: index + 1,
                id: section.id,
                title: section.customTitle || section.name,
                weight: section.weight,
                estimatedLength: this.estimateSectionLength(section, chapter),
                description: chapter ? chapter.description : '',
                focus: section.customFocus || (chapter ? chapter.description : '')
            };
        });
    }

    generateStatistics(configuration) {
        const enabledSections = configuration.sections.filter(s => s.enabled);
        const totalWeight = enabledSections.reduce((sum, s) => sum + s.weight, 0);
        const averageWeight = totalWeight / enabledSections.length;

        return {
            totalSections: enabledSections.length,
            totalWeight: totalWeight.toFixed(2),
            averageWeight: averageWeight.toFixed(2),
            estimatedPages: this.calculateEstimatedPages(configuration),
            estimatedReadingTime: this.calculateReadingTime(configuration),
            complexity: this.calculateComplexity(enabledSections),
            balanceScore: this.calculateBalanceScore(enabledSections)
        };
    }

    generateRecommendations(configuration) {
        const recommendations = [];
        const validation = this.validateConfiguration(configuration);

        // 基于验证结果生成建议
        if (validation.warnings.length > 0) {
            recommendations.push({
                type: 'warning',
                title: '配置优化建议',
                message: validation.warnings.join('；')
            });
        }

        // 基于权重分布生成建议
        const enabledSections = configuration.sections.filter(s => s.enabled);
        const weights = enabledSections.map(s => s.weight);
        const maxWeight = Math.max(...weights);
        const minWeight = Math.min(...weights);

        if (maxWeight / minWeight > 4) {
            recommendations.push({
                type: 'balance',
                title: '权重平衡建议',
                message: '章节权重差异较大，建议调整权重分布以获得更好的阅读体验'
            });
        }

        // 基于目的生成建议
        if (configuration.version) {
            const purposeRecommendations = this.getPurposeRecommendations(configuration.version);
            recommendations.push(...purposeRecommendations);
        }

        return recommendations;
    }

    getChapterInfo(chapterId) {
        // 这里应该从ChapterSelector获取章节信息
        // 为了简化，返回基本信息
        return {
            id: chapterId,
            name: chapterId,
            description: `${chapterId}章节`
        };
    }

    estimateSectionLength(section, chapter) {
        const baseLength = 2; // 基础页数
        const weightFactor = section.weight;
        const complexityFactor = chapter && chapter.complexity === 'high' ? 1.5 : 1.0;

        return Math.round(baseLength * weightFactor * complexityFactor);
    }

    calculateEstimatedPages(configuration) {
        const enabledSections = configuration.sections.filter(s => s.enabled);
        return enabledSections.reduce((total, section) => {
            const chapter = this.getChapterInfo(section.id);
            return total + this.estimateSectionLength(section, chapter);
        }, 0);
    }

    calculateReadingTime(configuration) {
        const pages = this.calculateEstimatedPages(configuration);
        const minutes = Math.ceil(pages / 2); // 每分钟2页
        return minutes < 60 ? `${minutes}分钟` : `${Math.floor(minutes / 60)}小时${minutes % 60}分钟`;
    }

    calculateComplexity(sections) {
        const complexityScore = sections.reduce((total, section) => {
            const chapter = this.getChapterInfo(section.id);
            const chapterComplexity = chapter && chapter.complexity === 'high' ? 3 :
                                     chapter && chapter.complexity === 'medium' ? 2 : 1;
            return total + (chapterComplexity * section.weight);
        }, 0);

        const averageComplexity = complexityScore / sections.reduce((sum, s) => sum + s.weight, 0);

        if (averageComplexity >= 2.5) return '高';
        if (averageComplexity >= 1.5) return '中';
        return '低';
    }

    calculateBalanceScore(sections) {
        const weights = sections.map(s => s.weight);
        const mean = weights.reduce((sum, w) => sum + w, 0) / weights.length;
        const variance = weights.reduce((sum, w) => sum + Math.pow(w - mean, 2), 0) / weights.length;
        const standardDeviation = Math.sqrt(variance);

        // 标准差越小，平衡性越好
        const balanceScore = Math.max(0, 100 - (standardDeviation * 50));
        return Math.round(balanceScore);
    }

    getPurposeRecommendations(version) {
        const recommendations = {
            'investor': [
                {
                    type: 'content',
                    title: '投资者版建议',
                    message: '建议增加财务分析和投资方案的权重，突出投资回报和风险评估'
                }
            ],
            'bank': [
                {
                    type: 'content',
                    title: '银行版建议',
                    message: '建议重点关注现金流分析和还款能力，确保抵押物信息完整'
                }
            ],
            'government': [
                {
                    type: 'content',
                    title: '政府申报版建议',
                    message: '建议突出社会效益和政策符合性，增加实施计划的详细程度'
                }
            ],
            'partner': [
                {
                    type: 'content',
                    title: '合作版建议',
                    message: '建议重点展示技术优势和合作价值，明确合作模式和利益分配'
                }
            ]
        };

        return recommendations[version] || [];
    }

    validateConfiguration(configuration) {
        const errors = [];
        const warnings = [];

        const enabledSections = configuration.sections.filter(s => s.enabled);
        const requiredSections = enabledSections.filter(s => s.required);

        if (enabledSections.length < 3) {
            warnings.push('章节数量较少，建议增加更多章节以确保内容完整性');
        }

        if (requiredSections.length === 0) {
            errors.push('缺少必需章节');
        }

        return {
            isValid: errors.length === 0,
            errors,
            warnings
        };
    }
}

// 导出为全局变量（兼容现有HTML）
window.IntelligentChapterCustomization = IntelligentChapterCustomization;
window.TemplateManager = TemplateManager;
window.ChapterSelector = ChapterSelector;
window.WeightAdjuster = WeightAdjuster;
// ContentOptimizer在content_generation_engine.js中导出
window.PreviewGenerator = PreviewGenerator;

// 如果支持ES6模块，也导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        IntelligentChapterCustomization,
        TemplateManager,
        ChapterSelector,
        WeightAdjuster,
        // ContentOptimizer在content_generation_engine.js中导出
        PreviewGenerator
    };
}