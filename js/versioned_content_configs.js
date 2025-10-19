/**
 * 版本化内容配置文件
 * 定义4个专业化版本的详细内容适配配置
 */

const VERSIONED_CONTENT_CONFIGS = {
    // 投资者版内容配置
    investor: {
        name: '投资者版',
        description: '针对投资者需求，重点突出财务回报、投资亮点和退出机制',
        contentAdaptations: {
            executive_summary: {
                highlights: [
                    'IRR 24.2%，显著高于基础设施平均水平',
                    'NPV@10% 8.7亿元，价值创造明确',
                    '4.2年投资回收期，资金周转效率高',
                    '华为兆级技术，3-5年绝对领先窗口'
                ],
                keyMetrics: [
                    { metric: '项目IRR', value: '24.2%', highlight: true },
                    { metric: 'NPV@10%', value: '8.7亿元', highlight: true },
                    { metric: '投资回收期', value: '4.2年', highlight: true },
                    { metric: 'EBITDA利润率', value: '28.6%', highlight: true }
                ],
                riskFactors: [
                    '技术风险极低：华为兆级技术独家保障',
                    '市场风险可控：时间价值刚性需求',
                    '政策风险低：6年持续支持期',
                    '成功率84.2%：蒙特卡洛模拟验证'
                ]
            },
            financial_analysis: {
                focus: '投资回报和盈利能力',
                customSections: [
                    {
                        title: '投资回报亮点',
                        content: `
                            <h4>🎯 核心投资指标</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>指标</th>
                                        <th>数值</th>
                                        <th>行业对比</th>
                                        <th>投资价值</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>内部收益率(IRR)</strong></td>
                                        <td>24.2%</td>
                                        <td>行业平均15-18%</td>
                                        <td class="text-success">⬆️ 35%溢价</td>
                                    </tr>
                                    <tr>
                                        <td><strong>净现值(NPV@10%)</strong></td>
                                        <td>8.7亿元</td>
                                        <td>同类项目3-5亿元</td>
                                        <td class="text-success">⬆️ 74%溢价</td>
                                    </tr>
                                    <tr>
                                        <td><strong>投资回收期</strong></td>
                                        <td>4.2年</td>
                                        <td>行业平均6-8年</td>
                                        <td class="text-success">⬆️ 40%提速</td>
                                    </tr>
                                    <tr>
                                        <td><strong>EBITDA利润率</strong></td>
                                        <td>28.6%</td>
                                        <td>行业平均20-25%</td>
                                        <td class="text-success">⬆️ 14%优势</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    },
                    {
                        title: '投资价值评估',
                        content: `
                            <h4>💰 投资价值深度分析</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>价值驱动因素</h5>
                                    <ul>
                                        <li><strong>技术领先红利</strong>：兆级技术独占期3-5年，IRR贡献5.49个百分点</li>
                                        <li><strong>效率提升优势</strong>：600kW vs 180kW，效率提升333.3%</li>
                                        <li><strong>市场时机把握</strong>：2027年市场容量14.1亿元，目标覆盖率198.4%</li>
                                        <li><strong>政策支持稳定</strong>：6年持续支持期，优于光伏行业退坡速度</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5>竞争优势壁垒</h5>
                                    <ul>
                                        <li><strong>技术壁垒</strong>：华为独家兆级技术，绝对领先优势</li>
                                        <li><strong>规模壁垒</strong>：1000座站点规模效应，成本优势明显</li>
                                        <li><strong>品牌壁垒</strong>：全国性品牌影响力，网络效应显著</li>
                                        <li><strong>政策壁垒</strong>：县域独家合作保护，市场准入优势</li>
                                    </ul>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            risk_assessment: {
                focus: '投资风险量化分析',
                customSections: [
                    {
                        title: '蒙特卡洛风险量化',
                        content: `
                            <h4>📊 蒙特卡洛模拟结果（1000次迭代）</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>统计指标</th>
                                                <th>数值</th>
                                                <th>评估</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td><strong>IRR均值</strong></td>
                                                <td>29.3%</td>
                                                <td class="text-success">优秀</td>
                                            </tr>
                                            <tr>
                                                <td><strong>标准差</strong></td>
                                                <td>20%</td>
                                                <td class="text-warning">中等</td>
                                            </tr>
                                            <tr>
                                                <td><strong>95%置信区间</strong></td>
                                                <td>4.3% - 69.1%</td>
                                                <td class="text-success">合理</td>
                                            </tr>
                                            <tr>
                                                <td><strong>高于资本成本概率</strong></td>
                                                <td>84.2%</td>
                                                <td class="text-success">高概率</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-6">
                                    <h5>投资风险评级</h5>
                                    <div class="alert alert-success">
                                        <h4>⭐⭐⭐⭐ 中等偏高风险等级</h4>
                                        <p>基于技术优势提供强缓冲，下行风险有限，上行空间巨大</p>
                                    </div>
                                    <h5>关键风险缓释</h5>
                                    <ul>
                                        <li>技术风险：华为独家保障，3-5年红利期</li>
                                        <li>市场风险：加油站式对标，刚性需求</li>
                                        <li>政策风险：6年持续支持，稳定性高</li>
                                        <li>执行风险：模块化建设，华为供应链</li>
                                    </ul>
                                </div>
                            </div>
                        `
                    }
                ]
            }
        },
        terminology: {
            replace: {
                '项目': '投资项目',
                '收益': '投资收益',
                '回报': '投资回报',
                '风险': '投资风险',
                '成本': '投资成本',
                '收入': '营业收入',
                '利润': '投资利润',
                '现金流': '投资现金流'
            }
        },
        pdfStyle: 'professional-financial'
    },

    // 银行机构版内容配置
    bank: {
        name: '银行机构版',
        description: '针对银行风控要求，重点突出现金流分析、还款能力和抵押资产',
        contentAdaptations: {
            executive_summary: {
                highlights: [
                    '年均EBITDA 6.36亿元，现金流充裕稳定',
                    '债务覆盖率1.5倍，安全边际充足',
                    '1000座充电站实体资产抵押，价值28亿元',
                    '单站年现金流63.6万元，还款来源稳定'
                ],
                keyMetrics: [
                    { metric: '年均EBITDA', value: '6.36亿元', highlight: true },
                    { metric: '债务覆盖率', value: '1.5倍', highlight: true },
                    { metric: '抵押资产价值', value: '28亿元', highlight: true },
                    { metric: '年还款能力', value: '6.36亿元', highlight: true }
                ],
                riskFactors: [
                    '抵押充足：1000座实体充电站资产',
                    '现金流稳定：基于实际运营数据',
                    '技术风险低：华为设备几乎零维护',
                    '政策支持：6年持续补贴期'
                ]
            },
            financial_analysis: {
                focus: '现金流分析和还款能力',
                customSections: [
                    {
                        title: '现金流分析',
                        content: `
                            <h4>💰 现金流详细分析</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>现金流指标</th>
                                        <th>单站(万元)</th>
                                        <th>1000站(亿元)</th>
                                        <th>银行评估</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>年营业收入</strong></td>
                                        <td>222.7</td>
                                        <td>22.27</td>
                                        <td class="text-success">稳定增长</td>
                                    </tr>
                                    <tr>
                                        <td><strong>年运营成本</strong></td>
                                        <td>159.1</td>
                                        <td>15.91</td>
                                        <td class="text-warning">成本可控</td>
                                    </tr>
                                    <tr>
                                        <td><strong>年EBITDA</strong></td>
                                        <td>63.6</td>
                                        <td>6.36</td>
                                        <td class="text-success">现金流充裕</td>
                                    </tr>
                                    <tr>
                                        <td><strong>年折旧摊销</strong></td>
                                        <td>25.7</td>
                                        <td>2.57</td>
                                        <td class="text-info">非现金支出</td>
                                    </tr>
                                    <tr>
                                        <td><strong>年净利润</strong></td>
                                        <td>37.9</td>
                                        <td>3.79</td>
                                        <td class="text-success">盈利能力强</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    },
                    {
                        title: '还款能力分析',
                        content: `
                            <h4>🏦 还款能力专项分析</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>还款来源保障</h5>
                                    <ul>
                                        <li><strong>主要还款来源</strong>：年EBITDA 6.36亿元</li>
                                        <li><strong>次要还款来源</strong>：设备残值、政府补贴</li>
                                        <li><strong>备用还款来源</strong>：再融资、资产处置</li>
                                        <li><strong>还款保障倍数</strong>：1.5倍（安全边际）</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5>还款压力测试</h5>
                                    <table class="table table-sm">
                                        <thead>
                                            <tr>
                                                <th>压力情景</th>
                                                <th>覆盖率</th>
                                                <th>评估</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>基准情景</td>
                                                <td>1.50倍</td>
                                                <td class="text-success">优秀</td>
                                            </tr>
                                            <tr>
                                                <td>悲观情景(-20%)</td>
                                                <td>1.20倍</td>
                                                <td class="text-warning">良好</td>
                                            </tr>
                                            <tr>
                                                <td>极端情景(-40%)</td>
                                                <td>0.90倍</td>
                                                <td class="text-danger">警戒</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            risk_assessment: {
                focus: '信贷风险和抵押物分析',
                customSections: [
                    {
                        title: '抵押物价值分析',
                        content: `
                            <h4>🏢 抵押资产价值评估</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>抵押物类型</th>
                                        <th>数量</th>
                                        <th>单站价值(万元)</th>
                                        <th>总价值(亿元)</th>
                                        <th>抵押率</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>充电设备</strong></td>
                                        <td>1000套</td>
                                        <td>180</td>
                                        <td>18.0</td>
                                        <td>70%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>电力设施</strong></td>
                                        <td>1000套</td>
                                        <td>40</td>
                                        <td>4.0</td>
                                        <td>70%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>场地使用权</strong></td>
                                        <td>1000处</td>
                                        <td>60</td>
                                        <td>6.0</td>
                                        <td>60%</td>
                                    </tr>
                                    <tr>
                                        <td><strong>合计抵押物</strong></td>
                                        <td>-</td>
                                        <td>280</td>
                                        <td><strong>28.0</strong></td>
                                        <td><strong>67%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="alert alert-info">
                                <h5>📋 抵押物评估要点</h5>
                                <ul>
                                    <li><strong>流动性分析</strong>：充电设备市场需求旺盛，变现能力强</li>
                                    <li><strong>价值稳定性</strong>：基于华为技术，设备残值率高</li>
                                    <li><strong>管理成本</strong>：设备维护成本极低，保值性好</li>
                                    <li><strong>法律保障</strong>：所有抵押物均具备完整产权证明</li>
                                </ul>
                            </div>
                        `
                    }
                ]
            }
        },
        terminology: {
            replace: {
                '投资': '融资项目',
                '收益': '现金流收入',
                '利润': '净现金流',
                '回报': '还款能力',
                '资产': '抵押资产',
                '收入': '现金流收入',
                '成本': '运营费用',
                '风险': '信贷风险'
            }
        },
        pdfStyle: 'formal-banking'
    },

    // 政府申报版内容配置
    government: {
        name: '政府申报版',
        description: '针对政府审批要求，重点突出政策符合性、社会效益和产业贡献',
        contentAdaptations: {
            executive_summary: {
                highlights: [
                    '符合双碳目标，年碳减排量约50万吨',
                    '创造就业岗位5000个，带动区域经济发展',
                    '技术创新领先，推动新能源产业升级',
                    '县域超充示范，完善基础设施网络'
                ],
                keyMetrics: [
                    { metric: '年碳减排量', value: '50万吨', highlight: true },
                    { metric: '就业创造', value: '5000个', highlight: true },
                    { metric: '产业带动效应', value: '100亿元', highlight: true },
                    { metric: '技术领先度', value: '国际领先', highlight: true }
                ],
                riskFactors: [
                    '政策高度符合：双碳目标、新基建、新能源政策',
                    '社会效益显著：环保、就业、产业发展多重效益',
                    '技术自主可控：华为国产技术，供应链安全',
                    '示范效应强：县域超充示范，可复制推广'
                ]
            },
            market_analysis: {
                focus: '政策环境和社会效益',
                customSections: [
                    {
                        title: '政策符合性分析',
                        content: `
                            <h4>🏛️ 政策符合性专项分析</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>政策文件</th>
                                        <th>发布单位</th>
                                        <th>符合程度</th>
                                        <th>支持措施</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>双碳目标指导意见</strong></td>
                                        <td>国务院</td>
                                        <td class="text-success">完全符合</td>
                                        <td>碳交易、绿色金融</td>
                                    </tr>
                                    <tr>
                                        <td><strong>新基建发展规划</strong></td>
                                        <td>发改委</td>
                                        <td class="text-success">重点支持</td>
                                        <td>专项基金、税收优惠</td>
                                    </tr>
                                    <tr>
                                        <td><strong>新能源汽车发展规划</strong></td>
                                        <td>工信部</td>
                                        <td class="text-success">高度契合</td>
                                        <td>建设补贴、运营补贴</td>
                                    </tr>
                                    <tr>
                                        <td><strong>县域超充示范政策</strong></td>
                                        <td>能源局</td>
                                        <td class="text-success">示范项目</td>
                                        <td>10万元/站补贴</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    },
                    {
                        title: '社会效益评估',
                        content: `
                            <h4>🌟 社会效益综合评估</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>环境效益</h5>
                                    <ul>
                                        <li><strong>碳减排贡献</strong>：年减排CO₂约50万吨</li>
                                        <li><strong>大气改善</strong>：减少尾气排放，改善空气质量</li>
                                        <li><strong>噪音降低</strong>：电动车替代燃油车，减少城市噪音</li>
                                        <li><strong>生态保护</strong>：推动绿色交通，保护生态环境</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5>社会效益</h5>
                                    <ul>
                                        <li><strong>就业创造</strong>：直接就业5000人，间接就业2万人</li>
                                        <li><strong>便民服务</strong>：完善基础设施，提升生活品质</li>
                                        <li><strong>区域发展</strong>：带动相关产业，促进经济增长</li>
                                        <li><strong>科技创新</strong>：推动技术进步，提升产业水平</li>
                                    </ul>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            implementation: {
                focus: '实施计划和社会效益',
                customSections: [
                    {
                        title: '产业带动效应',
                        content: `
                            <h4>🚀 产业带动效应分析</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>带动产业</th>
                                        <th>带动规模</th>
                                        <th>经济效益</th>
                                        <th>就业效应</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>设备制造业</strong></td>
                                        <td>1000套超充设备</td>
                                        <td>18亿元</td>
                                        <td>2000人</td>
                                    </tr>
                                    <tr>
                                        <td><strong>电力设施</strong></td>
                                        <td>1000座电站配套</td>
                                        <td>4亿元</td>
                                        <td>800人</td>
                                    </tr>
                                    <tr>
                                        <td><strong>建设工程</strong></td>
                                        <td>1000个站点建设</td>
                                        <td>3亿元</td>
                                        <td>1500人</td>
                                    </tr>
                                    <tr>
                                        <td><strong>运营服务</strong></td>
                                        <td>1000个站点运营</td>
                                        <td>2亿元</td>
                                        <td>700人</td>
                                    </tr>
                                    <tr>
                                        <td><strong>合计带动</strong></td>
                                        <td>-</td>
                                        <td><strong>27亿元</strong></td>
                                        <td><strong>5000人</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    }
                ]
            }
        },
        terminology: {
            replace: {
                '项目': '示范项目',
                '投资': '财政投入',
                '收益': '经济效益',
                '收入': '经济收入',
                '成本': '投入成本',
                '利润': '社会效益',
                '市场': '应用领域',
                '客户': '服务对象'
            }
        },
        pdfStyle: 'official-government'
    },

    // 合作洽谈版内容配置
    partner: {
        name: '合作洽谈版',
        description: '针对合作伙伴需求，重点突出技术优势、商业模式和共赢机制',
        contentAdaptations: {
            executive_summary: {
                highlights: [
                    '华为600kW-1000kW+兆级技术，绝对领先优势',
                    '2-3分钟满电体验，重新定义充电标准',
                    '1000座站点网络，覆盖全国主要区域',
                    '多元化合作模式，灵活的共赢机制'
                ],
                keyMetrics: [
                    { metric: '技术领先度', value: '3-5年', highlight: true },
                    { metric: '充电效率', value: '600kW-1000kW+', highlight: true },
                    { metric: '网络规模', value: '1000座', highlight: true },
                    { metric: '合作灵活性', value: '高度定制', highlight: true }
                ],
                riskFactors: [
                    '技术优势明显：华为独家兆级技术，竞争壁垒高',
                    '市场需求确定：新能源汽车爆发式增长',
                    '合作模式多样：可定制化合作方案',
                    '共赢机制明确：利益共享，风险共担'
                ]
            },
            technical_solution: {
                focus: '技术优势和合作价值',
                customSections: [
                    {
                        title: '技术竞争优势',
                        content: `
                            <h4>🚀 华为兆级超充技术优势</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>技术指标</th>
                                        <th>本项目</th>
                                        <th>行业平均</th>
                                        <th>竞争优势</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>最大功率</strong></td>
                                        <td>600kW-1000kW+</td>
                                        <td>180kW-360kW</td>
                                        <td class="text-success">领先200%+</td>
                                    </tr>
                                    <tr>
                                        <td><strong>充电速度</strong></td>
                                        <td>2-3分钟</td>
                                        <td>15-30分钟</td>
                                        <td class="text-success">提升10倍</td>
                                    </tr>
                                    <tr>
                                        <td><strong>转换效率</strong></td>
                                        <td>>96%</td>
                                        <td>90-94%</td>
                                        <td class="text-success">行业领先</td>
                                    </tr>
                                    <tr>
                                        <td><strong>故障率</strong></td>
                                        <td><0.04%</td>
                                        <td>0.07-0.12%</td>
                                        <td class="text-success">最低标准</td>
                                    </tr>
                                    <tr>
                                        <td><strong>散热效率</strong></td>
                                        <td>300W/°C</td>
                                        <td>100-150W/°C</td>
                                        <td class="text-success">提升200%</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    },
                    {
                        title: '技术合作价值',
                        content: `
                            <h4>💡 技术合作价值分析</h4>
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>技术壁垒优势</h5>
                                    <ul>
                                        <li><strong>专利保护</strong>：华为独家兆级技术专利</li>
                                        <li><strong>技术独占</strong>：3-5年绝对领先窗口</li>
                                        <li><strong>升级路径</strong>：平滑升级至更高功率</li>
                                        <li><strong>成本优势</strong>：升级成本降低70%</li>
                                    </ul>
                                </div>
                                <div class="col-md-6">
                                    <h5>合作技术价值</h5>
                                    <ul>
                                        <li><strong>技术授权</strong>：可获得华为技术授权</li>
                                        <li><strong>联合研发</strong>：参与后续技术研发</li>
                                        <li><strong>标准制定</strong>：参与行业标准制定</li>
                                        <li><strong>品牌增值</strong>：华为品牌技术背书</li>
                                    </ul>
                                </div>
                            </div>
                        `
                    }
                ]
            },
            market_analysis: {
                focus: '市场机会和竞争优势',
                customSections: [
                    {
                        title: '市场合作机会',
                        content: `
                            <h4>🎯 市场合作机会分析</h4>
                            <table class="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>合作领域</th>
                                        <th>市场机会</th>
                                        <th>合作价值</th>
                                        <th>收益模式</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>设备供应</strong></td>
                                        <td>1000套设备需求</td>
                                        <td>18亿元市场规模</td>
                                        <td>设备销售收入</td>
                                    </tr>
                                    <tr>
                                        <td><strong>技术服务</strong></td>
                                        <td>1000个站点服务</td>
                                        <td>持续技术服务收入</td>
                                        <td>技术服务费</td>
                                    </tr>
                                    <tr>
                                        <td><strong>运营管理</strong></td>
                                        <td>1000个站点运营</td>
                                        <td>6.36亿元年收入</td>
                                        <td>运营管理费</td>
                                    </tr>
                                    <tr>
                                        <td><strong>增值服务</strong></td>
                                        <td>多元化服务需求</td>
                                        <td>35亿元市场规模</td>
                                        <td>服务收入分成</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    }
                ]
            }
        },
        terminology: {
            replace: {
                '投资': '合作投入',
                '收益': '合作收益',
                '利润': '合作利润',
                '风险': '合作风险',
                '优势': '合作优势',
                '发展': '合作发展',
                '机会': '合作机会',
                '价值': '合作价值'
            }
        },
        pdfStyle: 'business-partnership'
    }
};

// 导出为全局变量（兼容现有HTML）
window.VERSIONED_CONTENT_CONFIGS = VERSIONED_CONTENT_CONFIGS;

// 如果支持ES6模块，也导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VERSIONED_CONTENT_CONFIGS;
}