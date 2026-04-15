/**
 * 事件库
 * 按纪元、路线、隐藏事件分类
 * 添加新事件只需修改此文件
 */

export function buildEventLibrary(EventImages) {
    return {
        1: [
            {
                name: "圈地运动",
                description: "你发现了一片公共土地，如果将其私有化建立工厂，能获得巨大财富，但流离失所的农民会涌入城市。",
                imageSvg: EventImages.enclosure,
                historicalParallel: "英国16-18世纪圈地运动：用暴力将农民从土地上赶走，为工业革命提供廉价劳动力。",
                quote: { text: '"资本来到世间，从头到脚，每个毛孔都滴着血和肮脏的东西。"', author: '马克思' },
                options: [
                    {text: "暴力强占", wealth: 50, conflict: 20, tech: 0, routeTag: 'conservative', social: {worker: -15, gov: -5, media: -10, rival: 0}},
                    {text: "支付补偿金缓慢收购", wealth: 20, conflict: 5, tech: 0, routeTag: 'reformer', social: {worker: 0, gov: 5, media: 5, rival: 0}},
                    {text: "保持公地，投资手工业", wealth: 10, conflict: 0, tech: 5, routeTag: 'technologist', social: {worker: 5, gov: 0, media: 5, rival: -5}}
                ],
                knowledge: "唯物史观：生产力的发展（机器工业）必然要求变革生产关系（私有制取代公有制）。资本原始积累的过程伴随着血腥与暴力。"
            },
            {
                name: "工人罢工",
                description: "工人们要求提高工资和改善工作条件，否则将举行大规模罢工。",
                imageSvg: EventImages.strike,
                historicalParallel: "19世纪英国宪章运动与法国里昂工人起义：早期工人阶级争取权利的斗争。",
                quote: { text: '"资本是死劳动，它像吸血鬼一样，只有吮吸活劳动才有生命。"', author: '马克思' },
                options: [
                    {text: "镇压罢工，雇佣新工人", wealth: -10, conflict: 25, tech: 0, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -10, rival: 5}},
                    {text: "妥协，小幅提高工资", wealth: -20, conflict: -10, tech: 0, routeTag: 'reformer', social: {worker: 10, gov: 5, media: 5, rival: 0}},
                    {text: "投资自动化设备替代工人", wealth: -30, conflict: 15, tech: 10, routeTag: 'technologist', social: {worker: -10, gov: 0, media: 0, rival: 5}}
                ],
                knowledge: "剩余价值理论：资本家通过延长劳动时间或提高劳动强度来获取更多剩余价值，这必然导致劳资矛盾的激化。"
            },
            {
                name: "黑奴贸易",
                description: " plantations 的棉花需求激增，参与跨大西洋奴隶贸易可获得巨额利润。",
                imageSvg: EventImages.slavery,
                historicalParallel: "16-19世纪大西洋奴隶贸易：资本主义原始积累最血腥的篇章之一。",
                quote: { text: '"美洲金银产地的发现，土著居民的被剿灭、被奴役和被埋葬于矿井，对东印度开始进行的征服和掠夺……"', author: '马克思、恩格斯' },
                options: [
                    {text: "投资奴隶贸易船队", wealth: 60, conflict: 25, tech: 0, routeTag: 'conservative', social: {worker: -10, gov: -10, media: -15, rival: 0}},
                    {text: "拒绝参与，投资本土纺织", wealth: 10, conflict: -5, tech: 5, routeTag: 'reformer', social: {worker: 5, gov: 5, media: 10, rival: 0}},
                    {text: "引进新式轧棉机减少人力依赖", wealth: 5, conflict: 5, tech: 15, routeTag: 'technologist', social: {worker: 0, gov: 0, media: 5, rival: -5}}
                ],
                knowledge: "原始积累不仅是土地的掠夺，更是对人身自由的剥夺。资本主义的全球扩张从一开始就建立在殖民与奴役之上。"
            },
            {
                name: "童工问题",
                description: "工厂里大量使用童工以压低工资，社会舆论开始出现谴责之声。",
                imageSvg: EventImages.childLabor,
                historicalParallel: "19世纪英国工厂大量使用童工，每天劳动16小时以上，直到《工厂法》颁布才逐步改善。",
                quote: { text: '"工人阶级的儿女从一出生就注定要成为资本的牺牲品。"', author: '恩格斯《英国工人阶级状况》' },
                options: [
                    {text: "继续使用童工，利润优先", wealth: 30, conflict: 20, tech: 0, routeTag: 'conservative', social: {worker: -15, gov: -10, media: -15, rival: 0}},
                    {text: "逐步遣散童工，雇佣成年技工", wealth: -10, conflict: -10, tech: 5, routeTag: 'reformer', social: {worker: 10, gov: 10, media: 10, rival: 0}},
                    {text: "发明半自动器械降低对童工依赖", wealth: -20, conflict: 0, tech: 15, routeTag: 'technologist', social: {worker: 5, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "过度剥削劳动力（尤其是妇女儿童）是资本原始积累阶段的典型特征，它透支了社会再生产的基础。"
            },
            {
                name: "银行危机",
                description: "过度放贷导致银行出现挤兑潮，你的企业也面临资金链断裂。",
                imageSvg: EventImages.bankCrisis,
                historicalParallel: "19世纪频繁的银行恐慌（如1857年、1873年），暴露了早期金融资本的脆弱性。",
                quote: { text: '"在危机中，商品和它的价值形态（货币）之间的对立发展成绝对矛盾。"', author: '马克思《资本论》' },
                options: [
                    {text: "裁员减薪，收缩规模自保", wealth: -10, conflict: 15, tech: 0, routeTag: 'conservative', social: {worker: -15, gov: 0, media: -5, rival: 10}},
                    {text: "向政府申请救济，承诺不裁员", wealth: 10, conflict: -5, tech: 0, routeTag: 'reformer', social: {worker: 10, gov: 10, media: 5, rival: 0}},
                    {text: "引入复式记账与信用保险", wealth: -20, conflict: 0, tech: 10, routeTag: 'technologist', social: {worker: 0, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "信用制度加速了资本集中，但也放大了经济危机的传染性。生产过剩与支付手段不足之间的矛盾是危机的直接导火索。"
            },
            {
                name: "工厂钟表与童工账簿",
                description: "你的管事建议把工人的每一分钟都记进账簿：谁慢了半拍，谁多耗了煤，谁在深夜还可以继续加班。你发现，真正值钱的不只是蒸汽机，还有把人变成可计算对象的管理术。",
                historicalParallel: "18-19世纪英国工厂制度：通过精细的劳动分工和计件工资，将工人的每一分钟都纳入资本增殖的轨道。",
                quote: { text: '"资本是死劳动，它像吸血鬼一样，只有吮吸活劳动才有生命。"', author: '马克思' },
                options: [
                    {text: "把每分钟都换算成成本", wealth: 25, conflict: 15, tech: 5, routeTag: 'conservative', social: {worker: -15, gov: 0, media: -5, rival: 5}},
                    {text: "缩短童工工时，保留熟练工训练", wealth: 5, conflict: -5, tech: 0, routeTag: 'reformer', social: {worker: 10, gov: 5, media: 5, rival: 0}},
                    {text: "让工人共同商议工序安排", wealth: 0, conflict: -10, tech: 10, routeTag: 'technologist', social: {worker: 15, gov: 0, media: 5, rival: -5}}
                ],
                knowledge: "资本最早的算法并不在硅片上，而在钟表、账簿和工厂纪律里。AI 不是资本计算的起点，而是这种计算冲动的极端延伸。",
                question: "当劳动被切成可计量的碎片，技术是在解放人，还是在把人变成流程的附件?"
            },
            {
                name: "纺机专利之争",
                description: "一位工程师带着改良纺机来找你。他声称这台机器能让女工和学徒更快上手，但也要求你支付专利费，并在工坊里重新分配熟练工的地位。",
                historicalParallel: "18世纪英国珍妮纺纱机与走锭精纺机的发明与专利争夺：技术进步加剧了资本集中和工人阶层的分化。",
                quote: { text: '"机器是生产剩余价值的手段。"', author: '马克思' },
                options: [
                    {text: "买断专利，迅速扩厂", wealth: 30, conflict: 10, tech: 15, routeTag: 'conservative', social: {worker: -5, gov: 0, media: 0, rival: 10}},
                    {text: "与工程师分成，逐步推广", wealth: 15, conflict: 0, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 5, media: 5, rival: 0}},
                    {text: "让工匠合作社共同持有技术", wealth: 0, conflict: -10, tech: 15, routeTag: 'technologist', social: {worker: 10, gov: 0, media: 5, rival: -5}}
                ],
                knowledge: "技术一旦进入资本主义生产，就会被纳入竞争、垄断与控制劳动的逻辑。问题不只是机器更先进，而是谁占有机器及其收益。",
                question: "当机器让熟练劳动被重新定价，技术是在扩大生产的可能，还是在压低劳动者讨价还价的能力?"
            },
            {
                name: "东印度公司贸易",
                description: "东印度公司的商船满载着茶叶、香料和鸦片驶向远方。公司允许私人商馆挂靠名下的武装船只，共享航线保护，但要上缴一笔可观的「保护费」。",
                imageSvg: EventImages.colonial,
                historicalParallel: "1600-1873年英国东印度公司：从商业企业演变为殖民统治机构，掌握印度乃至东南亚的经济命脉。",
                quote: { text: '"资产阶级在它的不到一百年的阶级统治中所创造的生产力，比过去一切世代创造的全部生产力还要多，还要大。"', author: '马克思、恩格斯' },
                options: [
                    {text: "入股东印度公司，参与东方贸易", wealth: 35, conflict: 15, tech: 5, routeTag: 'conservative', social: {worker: -5, gov: -5, media: -10, rival: 5}},
                    {text: "自己组建商船队，独立开拓航线", wealth: 25, conflict: 5, tech: 10, routeTag: 'technologist', social: {worker: 0, gov: 0, media: 5, rival: -5}},
                    {text: "用贸易利润投资本土棉纺织业", wealth: 20, conflict: -5, tech: 15, routeTag: 'reformer', social: {worker: 10, gov: 5, media: 10, rival: 0}}
                ],
                knowledge: "东印度公司是资本原始积累时期最具代表性的组织形态。它将国家权力与商业资本结合，是殖民掠夺的急先锋。资本主义的全球扩张从一开始就不是单纯的贸易。"
            },
            {
                name: "运河开凿与土地征收",
                description: "运河能够大幅降低运输成本，但沿途的农民和手工业者将失去生计。地方士绅联名请愿，要求停止这一「毁灭家园」的工程。",
                historicalParallel: "18-19世纪英国运河热：从布里奇沃特运河到遍布全英国的内陆水运网络，运河建设伴随着大规模的土地征收和农民流离失所。",
                quote: { text: '"由于资本的利益强迫人们去进行这种竞赛。"', author: '恩格斯' },
                options: [
                    {text: "低价强制征收，限期完成运河", wealth: 40, conflict: 20, tech: 10, routeTag: 'conservative', social: {worker: -15, gov: -5, media: -10, rival: 10}},
                    {text: "提高补偿标准，换取农民自愿搬迁", wealth: 20, conflict: 5, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 5, rival: 0}},
                    {text: "改为技术方案，开凿隧道绕开村落", wealth: 10, conflict: -5, tech: 20, routeTag: 'technologist', social: {worker: 10, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "基础设施建设的代价往往由社会最底层承担。运输革命（运河、铁路）降低了商品成本，却摧毁了大量农民和手工业者的生计，这是资本积累的又一种「血腥」形式。"
            },
            {
                name: "蒸汽机与工匠失业",
                description: "新型蒸汽动力纺织机问世，效率是旧式手工织机的数倍。作坊里的老工匠们群情激愤，他们的技术经验一夜之间变得一文不值。",
                historicalParallel: "19世纪初英国卢德运动：工人捣毁机器以示抗议，认为机器是让他们失业的罪魁祸首。马克思和恩格斯视之为早期工人阶级对资本主义工业化的本能反抗。",
                quote: { text: '"机器是生产剩余价值的手段。"', author: '马克思' },
                options: [
                    {text: "全面换装蒸汽机，淘汰手工织坊", wealth: 35, conflict: 20, tech: 15, routeTag: 'conservative', social: {worker: -20, gov: 0, media: -5, rival: 10}},
                    {text: "给老工匠提供转岗培训机会", wealth: 15, conflict: -10, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 5, media: 5, rival: 0}},
                    {text: "让工匠参与改进蒸汽机的调试工作", wealth: 10, conflict: -5, tech: 20, routeTag: 'technologist', social: {worker: 15, gov: 0, media: 5, rival: -5}}
                ],
                knowledge: "技术进步并不自动惠及所有人。在资本主义制度下，机器替代手工劳动往往意味着工人的去技能化和结构性失业。问题不在于技术本身，而在于技术进步的收益如何分配。"
            },
            {
                name: "济贫法与工作院",
                description: "流离失所的贫民越来越多，地方官员要求你资助新建「工作院」，以工代赈。但工作院里的条件极其恶劣，社会舆论开始关注。",
                historicalParallel: "1834年英国《济贫法修正案》：建立「工作院」，实行劣等待遇原则，旨在压制贫民、迫使他们接受低薪劳动。",
                quote: { text: '"资产阶级以维持等价交换为名，实行着对工人阶级的剥削。"', author: '恩格斯' },
                options: [
                    {text: "资助工作院建设，换取廉价劳动力来源", wealth: 25, conflict: 15, tech: 5, routeTag: 'conservative', social: {worker: -15, gov: 10, media: -10, rival: 5}},
                    {text: "推动改善工作院条件，提升人道标准", wealth: -10, conflict: -15, tech: 0, routeTag: 'reformer', social: {worker: 15, gov: 5, media: 10, rival: 0}},
                    {text: "投资建立技术培训学校取代工作院", wealth: -15, conflict: -10, tech: 15, routeTag: 'technologist', social: {worker: 10, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "《济贫法》实质上是将贫困问题归咎于个人，并通过制度化的贫困来迫使劳动力接受资本的条件。这不是慈善，而是维持劳动力商品供应的政治经济学。"
            },
            {
                name: "金本位制度确立",
                description: "各国正在讨论是否采用金本位。你的银行若能率先获得政府授权经营金本位业务，将极大提升信誉，但也需要储备大量黄金。",
                historicalParallel: "1816年英国正式确立金本位制：政府承诺以固定比率兑换纸币与黄金，这一制度后来成为19世纪国际贸易的基石，直到一战后才被放弃。",
                quote: { text: '"货币是商品在交换过程中的一般等价物。"', author: '马克思' },
                options: [
                    {text: "率先申请金本位业务，囤积黄金储备", wealth: 30, conflict: 10, tech: 5, routeTag: 'conservative', social: {worker: -5, gov: 10, media: 5, rival: 5}},
                    {text: "支持建立央行统一管理黄金储备", wealth: 15, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 15, media: 10, rival: -5}},
                    {text: "探索发行银行券的信用货币体系", wealth: 10, conflict: 0, tech: 15, routeTag: 'technologist', social: {worker: 0, gov: 5, media: 5, rival: 0}}
                ],
                knowledge: "金本位制表面上是稳健的货币制度，实际上是英国等强国向全球转嫁危机成本的工具。通过固定汇率，核心国的通胀会传导到外围国，而危机来临时，外围国首先遭殃。"
            }
        ],
        2: [
            {
                name: "经济危机",
                description: "生产的商品堆积如山，但底层工人买不起。库存积压，资金链即将断裂。",
                imageSvg: EventImages.crisis,
                historicalParallel: "1929年大萧条与2008年金融危机：生产社会化与生产资料私有制矛盾的集中爆发。",
                quote: { text: '"生产过剩的经济危机是资本主义制度的必然伴侣。"', author: '恩格斯' },
                options: [
                    {text: "销毁库存，维持价格", wealth: -20, conflict: 30, tech: 0, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -10, rival: 15}},
                    {text: "降价倾销，开拓海外市场", wealth: -10, conflict: 0, tech: 5, routeTag: 'technologist', social: {worker: 0, gov: 0, media: 0, rival: -10}},
                    {text: "提高工人工资，扩大内需", wealth: -30, conflict: -15, tech: 0, routeTag: 'reformer', social: {worker: 15, gov: 10, media: 10, rival: 0}}
                ],
                knowledge: "生产社会化与生产资料私有制的基本矛盾。资本主义无法消灭相对过剩人口和消费不足的痼疾。"
            },
            {
                name: "技术革命",
                description: "新的生产技术出现，可以大幅提高生产效率，但需要大量投资。",
                imageSvg: EventImages.tech,
                historicalParallel: "第二次工业革命（电力、内燃机、流水线）：垄断资本主义形成的物质基础。",
                quote: { text: '"劳动用机器代替了手工劳动，但是，工人却变成了机器的单纯的附属品。"', author: '《共产党宣言》' },
                type: 'slider',
                slider: {
                    label: "投资力度",
                    min: 0,
                    max: 100,
                    default: 50,
                    preview: "根据投资比例决定收益与风险"
                },
                // slider 基准值：按百分比缩放
                sliderBase: {wealth: -40, conflict: 10, tech: 25, routeTag: 'technologist', social: {worker: -5, gov: 0, media: 0, rival: 5}},
                options: [
                    {text: "保守投资，逐步更新", wealth: -20, conflict: 5, tech: 15, routeTag: 'reformer', social: {worker: 0, gov: 5, media: 5, rival: 0}},
                    {text: "维持现状，不投资", wealth: 0, conflict: 0, tech: 0, routeTag: 'conservative', social: {worker: 0, gov: 0, media: 0, rival: 5}}
                ],
                knowledge: "生产力决定生产关系。技术革命推动生产力发展，但资本主义生产关系可能成为生产力发展的桎梏。"
            },
            {
                name: "世界大战订单",
                description: "国家陷入战争，军火订单如雪片般飞来，但工厂工人可能被征召入伍。",
                imageSvg: EventImages.warOrder,
                historicalParallel: "两次世界大战期间，美国、德国等国的军事工业复合体迅速膨胀。",
                quote: { text: '"帝国主义就是战争。"', author: '列宁' },
                options: [
                    {text: "全面转产军工，牟取暴利", wealth: 50, conflict: 20, tech: 10, routeTag: 'conservative', social: {worker: -15, gov: 15, media: -10, rival: 10}},
                    {text: "接受订单但改善工人待遇", wealth: 30, conflict: 0, tech: 5, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 5, rival: 0}},
                    {text: "研发新型武器技术", wealth: 20, conflict: 10, tech: 25, routeTag: 'technologist', social: {worker: -5, gov: 10, media: 0, rival: -5}}
                ],
                knowledge: "帝国主义阶段，资本扩张与军事暴力深度绑定。军火资本成为垄断资本的重要组成部分，战争成为资本转嫁危机的手段。"
            },
            {
                name: "股市崩盘",
                description: "股市泡沫破裂，投资者恐慌性抛售，你的企业市值大幅缩水。",
                imageSvg: EventImages.stockCrash,
                historicalParallel: "1929年华尔街黑色星期四：虚拟资本与实体经济的脱节导致了史无前例的经济大萧条。",
                quote: { text: '"有价证券的资本化是按利息资本计算的。"', author: '马克思《资本论》第三卷' },
                options: [
                    {text: "抛售资产，裁员止血", wealth: -10, conflict: 20, tech: 0, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -10, rival: 15}},
                    {text: "联合其他资本家救市", wealth: -30, conflict: -5, tech: 0, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 10, rival: -10}},
                    {text: "趁低收购竞争对手技术专利", wealth: -20, conflict: 5, tech: 20, routeTag: 'technologist', social: {worker: 0, gov: 0, media: 5, rival: -15}}
                ],
                knowledge: "虚拟资本的膨胀使经济危机具有了更强的投机性和传染性。金融资本与产业资本的脱节，放大了周期性危机的破坏力。"
            },
            {
                name: "反垄断法案",
                description: "政府出台严厉的反垄断法，你的垄断地位受到威胁。",
                imageSvg: EventImages.antitrust,
                historicalParallel: "19世纪末20世纪初美国《谢尔曼反托拉斯法》：国家为缓和阶级矛盾而进行的制度调整。",
                quote: { text: '"竞争转变为垄断，而现代社会的全部经济制度都建立在垄断的基础上。"', author: '列宁《帝国主义是资本主义的最高阶段》' },
                options: [
                    {text: "暗中分化瓦解法案推进", wealth: -10, conflict: 15, tech: 0, routeTag: 'conservative', social: {worker: -10, gov: -15, media: -10, rival: 10}},
                    {text: "主动拆分，换取社会声誉", wealth: -20, conflict: -15, tech: 0, routeTag: 'reformer', social: {worker: 10, gov: 15, media: 15, rival: 0}},
                    {text: "以技术专利优势形成新壁垒", wealth: 10, conflict: 5, tech: 15, routeTag: 'technologist', social: {worker: 0, gov: -5, media: 0, rival: -10}}
                ],
                knowledge: "垄断是资本主义发展到一定阶段的必然产物。国家干预表面上限制垄断，实则是为了维护资本主义制度的长期稳定。"
            },
            {
                name: "流水线与管理算法",
                description: "工程师向你展示一套新的管理体系：把工人的经验拆成标准动作，再交给统计表、监督员和奖惩系统执行。流水线开始像一台会思考的机器，而工人更像机器的一部分。",
                historicalParallel: "20世纪初福特制与泰罗制的兴起：将复杂的劳动过程分解为简单、可量化的标准动作，极大地提高了生产效率，也加深了工人的异化。",
                quote: { text: '"劳动用机器代替了手工劳动，但是，工人却变成了机器的单纯的附属品。"', author: '《共产党宣言》' },
                options: [
                    {text: "把经验写成规训手册，全面推广", wealth: 20, conflict: 15, tech: 10, routeTag: 'conservative', social: {worker: -10, gov: 0, media: -5, rival: 5}},
                    {text: "让工人参与改造流程", wealth: 5, conflict: -10, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 5, media: 5, rival: 0}},
                    {text: "保留车间自治，放缓标准化", wealth: -10, conflict: -5, tech: 5, routeTag: 'technologist', social: {worker: 5, gov: 0, media: 5, rival: -5}}
                ],
                knowledge: "从泰罗制到平台算法，资本不断把活劳动中的知识抽离出来，沉淀为对劳动者的外部控制系统。AI 管理并非凭空出现，而是这一过程的高级形态。",
                question: "如果管理本身也被机器化，工人的经验是在消失，还是被夺走?"
            },
            {
                name: "跨洋电报与价格同盟",
                description: "跨洋电报让你第一次可以在一天之内得知远方市场的报价。同行们提议建立价格同盟，一边共享情报，一边联合压低原料与工资成本。",
                historicalParallel: "19世纪中后期跨大西洋电报的铺设：信息传递速度的革命性提升，首先被用于金融投机和垄断资本的国际协调。",
                quote: { text: '"竞争转变为垄断，而现代社会的全部经济制度都建立在垄断的基础上。"', author: '列宁' },
                options: [
                    {text: "加入同盟，扩大市场控制", wealth: 30, conflict: 10, tech: 10, routeTag: 'conservative', social: {worker: -10, gov: -5, media: -5, rival: 15}},
                    {text: "只共享物流和库存信息", wealth: 15, conflict: 0, tech: 10, routeTag: 'reformer', social: {worker: 0, gov: 5, media: 5, rival: 0}},
                    {text: "公开价格信息，防止垄断", wealth: -10, conflict: -10, tech: 5, routeTag: 'technologist', social: {worker: 5, gov: 10, media: 10, rival: -10}}
                ],
                knowledge: "通信技术并不会自动带来更公平的市场。它同样可能成为资本协调垄断、转嫁危机和压缩劳动成本的工具。",
                question: "当信息传递越来越快，受益最大的会是社会协作，还是更有能力操纵市场的资本集团?"
            },
            {
                name: "工会合法化运动",
                description: "工人们要求结社自由，组织工会。你是反对最激烈的厂商之一，但越来越多的工人开始秘密罢工。",
                historicalParallel: "1820-1850年代英国工会运动：从《结社法》废除到宪章运动，工人阶级开始以组织形式争取权益。",
                quote: { text: '"无产者在这个革命中失去的只是锁链。他们获得的将是整个世界。"', author: '马克思、恩格斯' },
                options: [
                    {text: "联合其他厂商对抗工会化", wealth: 15, conflict: 25, tech: 0, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -10, rival: 10}},
                    {text: "主动谈判，签订集体工资协议", wealth: -15, conflict: -15, tech: 5, routeTag: 'reformer', social: {worker: 15, gov: 10, media: 10, rival: -5}},
                    {text: "引入半自动设备，削弱工会的关键地位", wealth: 10, conflict: 10, tech: 15, routeTag: 'technologist', social: {worker: -10, gov: 0, media: 5, rival: 5}}
                ],
                knowledge: "工会是工人阶级组织起来对抗资本的重要形式。但资本家同样可以通过引入机器、转移生产或雇佣工贼来瓦解工会力量。这是劳资之间持续的制度性博弈。"
            },
            {
                name: "社会主义国际组织",
                description: "来自欧洲各国的社会主义者正在秘密筹建「国际工人协会」。马克思和恩格斯是主要领袖。他们主张全世界无产者联合起来。",
                historicalParallel: "1864年第一国际成立：国际工人协会（第一国际）在伦敦成立，马克思是实际领袖，推动工人阶级的国际团结。",
                quote: { text: '"全世界无产者，联合起来！"', author: '马克思、恩格斯' },
                options: [
                    {text: "向政府告发，破坏工人运动", wealth: 10, conflict: 20, tech: 0, routeTag: 'conservative', social: {worker: -15, gov: -10, media: -5, rival: 5}},
                    {text: "暗中资助，换取工人好感", wealth: -20, conflict: -10, tech: 0, routeTag: 'reformer', social: {worker: 10, gov: -5, media: 5, rival: 0}},
                    {text: "观望，试图将运动引向技术改良方向", wealth: 0, conflict: 0, tech: 10, routeTag: 'technologist', social: {worker: 5, gov: 0, media: 0, rival: 0}}
                ],
                knowledge: "第一国际将工人运动从各国的分散行动推向国际联合。马克思主张通过政治斗争夺取国家政权，而巴枯宁等无政府主义者则主张直接推翻一切国家。这一分歧最终导致了第一国际的分裂。"
            },
            {
                name: "殖民地去工业化",
                description: "你的纺织厂产品正在大量出口到殖民地。但那里的本地纺织业正在被你的廉价商品摧毁，大量工匠失业。",
                historicalParallel: "19世纪英国棉纺织品出口摧毁印度传统手工业：达卡等纺织中心的工匠大批失业，英国商品占领印度市场，英国殖民政府保护这种不平等贸易。",
                quote: { text: '"英国在广州设置商馆，以此为据点，在印度种植鸦片，在中国市场销售。"', author: '马克思' },
                options: [
                    {text: "加大出口，彻底摧毁殖民地本土工业", wealth: 40, conflict: 15, tech: 5, routeTag: 'conservative', social: {worker: -5, gov: -5, media: -5, rival: 5}},
                    {text: "在殖民地设立工厂，培训当地工人", wealth: 20, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 10, media: 5, rival: -5}},
                    {text: "转移低利润产能，专注高端技术研发", wealth: 25, conflict: 0, tech: 15, routeTag: 'technologist', social: {worker: 0, gov: 5, media: 5, rival: 0}}
                ],
                knowledge: "殖民地去工业化是宗主国积累资本的重要手段。通过摧毁殖民地的本土手工业，资本主义将殖民地纳入全球商品市场，同时将原材料和劳动力廉价地控制在手中。这是另一形式的原始积累。"
            },
            {
                name: "1907年金融危机",
                description: "股市突然崩盘，银行挤兑风潮蔓延。你的几家合作银行面临破产，政府希望你们这些大厂商伸出援手。",
                historicalParallel: "1907年美国银行业危机：纽约多家银行因铁路股票投机失败而倒闭，引发全国性的银行挤兑，最终由J.P.摩根牵头组织救市。",
                quote: { text: '"在危机中，商品和它的价值形态（货币）之间的对立发展成绝对矛盾。"', author: '马克思《资本论》' },
                options: [
                    {text: "拒绝救市，趁乱收购倒闭银行的资产", wealth: 30, conflict: 20, tech: 0, routeTag: 'conservative', social: {worker: -15, gov: -10, media: -10, rival: 15}},
                    {text: "出资救市，与政府和银行共渡难关", wealth: -20, conflict: -10, tech: 0, routeTag: 'reformer', social: {worker: 10, gov: 15, media: 10, rival: -5}},
                    {text: "引入现代信用保险和储备金制度", wealth: -10, conflict: 0, tech: 20, routeTag: 'technologist', social: {worker: 0, gov: 10, media: 5, rival: -5}}
                ],
                knowledge: "1907年的危机暴露了金融资本与产业资本之间的脆弱平衡。J.P.摩根的私人救市行动开启了央行介入的最后贷款人机制，但这种机制同样意味着大资本家的损失由全社会承担。"
            },
            {
                name: "泰坦尼克号沉没与保险",
                description: "泰坦尼克号沉没，船上大批富豪丧生，保险公司面临巨额赔付。你的公司也承保了部分保险，现在面临资金压力。",
                historicalParallel: "1912年泰坦尼克号海难：当时最大的客运邮轮沉没，造成1517人死亡，保险公司赔付约100万美元（当时巨款）。",
                quote: { text: '"保险制度不过是资本家弥补损失的一种方法罢了。"', author: '恩格斯' },
                options: [
                    {text: "拒绝足额赔付，利用条款漏洞少赔", wealth: 20, conflict: 15, tech: 0, routeTag: 'conservative', social: {worker: -5, gov: -5, media: -15, rival: 5}},
                    {text: "全额赔付，维护保险业信誉", wealth: -30, conflict: -10, tech: 0, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 15, rival: 0}},
                    {text: "开发新的精算模型，提升风险管理", wealth: -10, conflict: 0, tech: 15, routeTag: 'technologist', social: {worker: 0, gov: 5, media: 5, rival: 0}}
                ],
                knowledge: "保险制度是资本主义将风险社会化的机制之一。个体支付的保费聚集起来，用于补偿少数倒霉者。但在赔付纠纷中，资本方往往拥有信息优势和条款解释权。"
            }
        ],
        3: [
            {
                name: "人工智能取代人力",
                description: "你研发出了通用人工智能（AGI），可以取代90%的工人。效率极高，但剩下的10%工人面临绝境。",
                imageSvg: EventImages.ai,
                historicalParallel: "当前生成式AI引发的大规模失业焦虑：新一轮技术革命正在重塑劳动市场。",
                quote: { text: '"机器本身缩短劳动时间，但它的资本主义使用却延长工作日。"', author: '马克思《资本论》' },
                type: 'slider',
                slider: {
                    label: "AI 替代比例",
                    min: 0,
                    max: 100,
                    default: 50,
                    preview: "替代比例越高，财富与技术增长越快，但社会矛盾与工人信任越差"
                },
                sliderBase: {wealth: 50, conflict: 99, tech: 30, routeTag: 'technologist', social: {worker: -20, gov: -5, media: -5, rival: 10}},
                options: [
                    {text: "推行机器人税，将利润分配给全民", wealth: 20, conflict: -20, tech: 20, routeTag: 'reformer', social: {worker: 15, gov: 10, media: 10, rival: 0}},
                    {text: "利用AI进行计划经济，弱化市场调节", wealth: 0, conflict: -30, tech: 30, routeTag: 'technologist', social: {worker: 5, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "AI时代，资本逻辑非但没有失效，反而强化了。当生产资料高度集中时，资本主义的雇佣劳动关系就瓦解了。"
            },
            {
                name: "全球气候危机",
                description: "气候变化导致极端天气频发，社会要求企业承担更多环保责任。",
                imageSvg: EventImages.climate,
                historicalParallel: "当代气候变暖与生态危机：资本无限增殖逻辑与地球有限资源之间的根本冲突。",
                quote: { text: '"资本主义生产破坏着一切财富的源泉——土地和劳动者。"', author: '马克思' },
                type: 'slider',
                slider: {
                    label: "环保投入比例",
                    min: 0,
                    max: 100,
                    default: 50,
                    preview: "投入越高，财富减少越多，但社会矛盾降低、政府支持与媒体舆论提升"
                },
                sliderBase: {wealth: -40, conflict: -20, tech: 25, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 10, rival: -5}},
                options: [
                    {text: "无视环保要求，继续追求利润", wealth: 30, conflict: 40, tech: 0, routeTag: 'conservative', social: {worker: -10, gov: -15, media: -15, rival: 10}},
                    {text: "投资绿色技术，逐步转型", wealth: -20, conflict: -10, tech: 15, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 10, rival: 0}}
                ],
                knowledge: "资本主义的生产方式与生态环境之间存在根本矛盾。无限扩张的资本逻辑与有限的自然资源之间存在不可调和的冲突。"
            },
            {
                name: "数据隐私泄露",
                description: "你掌握的大量用户数据被黑客窃取并公开，引发全民对数字寡头的愤怒。",
                imageSvg: EventImages.dataPrivacy,
                historicalParallel: "近年来Facebook-Cambridge Analytica等数据丑闻：数字资本对用户行为的全面监控。",
                quote: { text: '"在资产阶级社会里，资本具有独立性和个性，而活动着的个人却没有独立性和个性。"', author: '马克思、恩格斯' },
                options: [
                    {text: "压制舆论，起诉 whistleblower", wealth: -10, conflict: 30, tech: 0, routeTag: 'conservative', social: {worker: -15, gov: -10, media: -20, rival: 5}},
                    {text: "公开道歉，加强数据保护立法", wealth: -30, conflict: -15, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 10, media: 15, rival: 0}},
                    {text: "用AI追踪泄露源并升级防火墙", wealth: -20, conflict: 5, tech: 20, routeTag: 'technologist', social: {worker: 0, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "数字资本时代，数据成为新的生产资料。对用户隐私的剥夺是数字剥削的新形式，它加剧了资本对日常生活的渗透与控制。"
            },
            {
                name: "太空殖民计划",
                description: "太空采矿与火星殖民成为可能，需要天文数字般的投资，但回报同样惊人。",
                imageSvg: EventImages.spaceColony,
                historicalParallel: "当代SpaceX、Blue Origin等太空私企：资本逻辑从地球向宇宙空间的扩张。",
                quote: { text: '"资产阶级除非对生产工具，从而对生产关系，从而对全部社会关系不断地进行革命，否则就不能生存下去。"', author: '马克思、恩格斯' },
                options: [
                    {text: "独占太空资源开采权", wealth: 60, conflict: 25, tech: 20, routeTag: 'conservative', social: {worker: -10, gov: -5, media: -5, rival: 15}},
                    {text: "与国际机构合作开发", wealth: 30, conflict: -5, tech: 15, routeTag: 'reformer', social: {worker: 5, gov: 15, media: 10, rival: -5}},
                    {text: "研发可控核聚变推进技术", wealth: 10, conflict: 0, tech: 35, routeTag: 'technologist', social: {worker: 0, gov: 10, media: 5, rival: -10}}
                ],
                knowledge: "当地球市场趋于饱和，资本必然向新的空间扩张。太空殖民是资本增殖逻辑在宇宙尺度的延伸，但它无法解决资本主义的基本矛盾。"
            },
            {
                name: "基因编辑伦理",
                description: "基因编辑技术可以制造'完美劳动者'，但伦理争议巨大，社会哗然。",
                imageSvg: EventImages.geneEdit,
                historicalParallel: "2018年基因编辑婴儿事件：生物技术在资本驱动下对人类伦理底线的挑战。",
                quote: { text: '"人本身——劳动力——也成为商品，而且是最廉价的商品。"', author: '恩格斯' },
                options: [
                    {text: "秘密资助人体实验", wealth: 40, conflict: 35, tech: 25, routeTag: 'conservative', social: {worker: -20, gov: -15, media: -20, rival: 10}},
                    {text: "呼吁全球伦理监管框架", wealth: -10, conflict: -15, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 15, media: 15, rival: 0}},
                    {text: "将技术用于疾病治疗以转移焦点", wealth: 10, conflict: -5, tech: 20, routeTag: 'technologist', social: {worker: 5, gov: 5, media: 10, rival: -5}}
                ],
                knowledge: "生物技术在资本逻辑下可能导致对人的生命本身进行商品化。当劳动力可以被'设计'时，人的主体性将面临前所未有的危机。"
            },
            {
                name: "模型训练数据围猎",
                description: "平台企业开始扫荡图书、影像、论坛与公共数据集。每一段文字、每一次点击、每一张图像都被重新命名为训练燃料。你忽然意识到，新的原始积累正在网络上重演。",
                historicalParallel: "21世纪互联网平台对用户数据的广泛采集：从社交媒体到搜索引擎，个人行为数据被大规模商品化，成为数字资本的核心生产资料。",
                quote: { text: '"在资产阶级社会里，资本具有独立性和个性，而活动着的个人却没有独立性和个性。"', author: '马克思、恩格斯' },
                options: [
                    {text: "尽可能吞并数据源，建立壁垒", wealth: 35, conflict: 20, tech: 15, routeTag: 'conservative', social: {worker: -5, gov: -10, media: -10, rival: 15}},
                    {text: "签署授权协议，按比例分成", wealth: 10, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 5, media: 5, rival: 0}},
                    {text: "推动开放数据合作社", wealth: -15, conflict: -15, tech: 20, routeTag: 'technologist', social: {worker: 10, gov: 5, media: 10, rival: -10}}
                ],
                knowledge: "数据积累不是中性的'素材收集'，而是新的圈地运动。资本借助 AI 再次把共同生产的社会知识改写为私人资产。",
                question: "如果知识来自无数人的共同创造，训练 AI 的基础资料为什么要被少数平台据为己有?"
            },
            {
                name: "AI 平台零工化",
                description: "你的平台决定把越来越多的工作拆成瞬时任务，由算法派单、评分、淘汰。名义上人人都更自由了，实际上每个人都在为一套看不见的模型证明自己仍有被使用的价值。",
                historicalParallel: "21世纪平台经济中的零工劳动：外卖骑手、网约车司机等在算法调度下工作，劳动关系趋于碎片化，劳动者权益保障面临巨大挑战。",
                quote: { text: '"工人阶级的儿女从一出生就注定要成为资本的牺牲品。"', author: '恩格斯' },
                options: [
                    {text: "全面推进平台化用工", wealth: 25, conflict: 20, tech: 10, routeTag: 'conservative', social: {worker: -15, gov: -5, media: -10, rival: 10}},
                    {text: "设置最低保障和透明评分", wealth: 10, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 10, media: 5, rival: 0}},
                    {text: "把平台转为劳动者合作社", wealth: -10, conflict: -15, tech: 15, routeTag: 'technologist', social: {worker: 15, gov: 5, media: 10, rival: -10}}
                ],
                knowledge: "AI 不只替代岗位，也会重写劳动关系。所谓灵活用工，往往意味着风险社会化、收益平台化，以及算法对劳动过程的持续统治。",
                question: "如果平台宣称每个人都可以自由接单，但定价、分配和淘汰都由算法决定，这种自由究竟属于谁?"
            },
            {
                name: "平台经济零工崛起",
                description: "你的外卖和网约车平台正在大规模扩张。骑手和司机们不知道的是，你的后台算法正在实时计算如何将他们的收入压到最低。",
                historicalParallel: "2010年代共享经济兴起：Uber、Lyft、DoorDash等平台以「零工经济」模式颠覆传统就业，劳动者失去雇员身份保障，仅获得按件计酬。",
                quote: { text: '"在资产阶级社会里，资本具有独立性和个性，而活动着的个人却没有独立性和个性。"', author: '马克思、恩格斯' },
                options: [
                    {text: "压低单均价，提高平台抽成比例", wealth: 30, conflict: 20, tech: 5, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -10, rival: 10}},
                    {text: "建立最低收入保障和透明算法", wealth: -10, conflict: -15, tech: 10, routeTag: 'reformer', social: {worker: 15, gov: 10, media: 10, rival: 0}},
                    {text: "用AI优化调度算法，减少空转时间", wealth: 15, conflict: 5, tech: 15, routeTag: 'technologist', social: {worker: -5, gov: 5, media: 5, rival: 5}}
                ],
                knowledge: "平台经济将劳动者的「独立性」变成了新的控制形式。名义上，骑手和司机是自己的老板，实际上他们被算法牢牢控制：算法决定价格、路线、评分，甚至奖惩。劳动过程中的主体性被彻底剥夺。"
            },
            {
                name: "数字货币与监控资本",
                description: "各国央行正在试点数字货币，你的科技公司也被邀请参与技术合作。这意味着每一笔交易都将留痕，政府和平台将同时拥有你的财务数据。",
                historicalParallel: "2020年代各国央行数字货币（CBDC）探索：中国数字人民币试点、美国FedNow项目等，探索数字时代货币主权的实现形式。",
                quote: { text: '"消费不再是一种行为，而是一种被引导的选择。"', author: '当代学者对数字监控资本的批判' },
                options: [
                    {text: "深度参与央行数字货币技术，获取数据红利", wealth: 25, conflict: 15, tech: 15, routeTag: 'conservative', social: {worker: -10, gov: 10, media: -5, rival: 5}},
                    {text: "推动隐私保护立法，限制数据使用范围", wealth: -5, conflict: -10, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: -5, media: 15, rival: 0}},
                    {text: "研发抗审查的加密货币与之对抗", wealth: 10, conflict: 5, tech: 20, routeTag: 'technologist', social: {worker: 5, gov: -10, media: 5, rival: -5}}
                ],
                knowledge: "数字货币表面上是技术进步，但实际上关乎货币主权、数据所有权和社会控制。当交易数据被国家或平台掌握，个人的经济行为将被彻底透明化。这既是监控资本的终极形态，也可能成为社会信用体系的基础。"
            },
            {
                name: "元宇宙地产投机",
                description: "虚拟世界的土地正在被热炒。你的公司已经开始在元宇宙中购买「地块」，声称这里是下一片投资热土。",
                historicalParallel: "2021-2022年NFT和虚拟地产热潮：Decentraland、The Sandbox等虚拟世界中地块价格飙升，众多明星和品牌入驻，后泡沫破裂。",
                quote: { text: '"资本害怕没有利润或利润过少的情况……为了100%的利润，它就敢践踏一切人间法律。"', author: '马克思' },
                options: [
                    {text: "大举进军元宇宙，收购核心地块", wealth: 40, conflict: 15, tech: 10, routeTag: 'conservative', social: {worker: -10, gov: -5, media: -5, rival: 10}},
                    {text: "谨慎参与，保留随时退出的选项", wealth: 15, conflict: 0, tech: 5, routeTag: 'reformer', social: {worker: 0, gov: 5, media: 5, rival: 0}},
                    {text: "自建底层基础设施，制定元宇宙规则", wealth: -20, conflict: -5, tech: 25, routeTag: 'technologist', social: {worker: 5, gov: 10, media: 5, rival: -10}}
                ],
                knowledge: "元宇宙地产投机是资本寻找新增殖空间的最新尝试。当实体经济和金融市场趋于饱和，资本必然向虚拟世界扩张——这是一种「价值转移」，但并不创造实际的使用价值，泡沫破裂只是时间问题。"
            },
            {
                name: "脑机接口与人类增强",
                description: "你的实验室研发出了首款民用脑机接口设备。健康人可以通过它增强认知能力，但批评者认为这是对人类自然状态的最后一击。",
                historicalParallel: "21世纪神经技术商业化：Neuralink等公司探索脑机接口，DARPA资助神经增强研究，引发关于人类异化和不平等的激烈争论。",
                quote: { text: '"人本身——劳动力——也成为商品，而且是最廉价的商品。"', author: '恩格斯' },
                options: [
                    {text: "高价推出民用版，只卖给富裕阶层", wealth: 50, conflict: 25, tech: 15, routeTag: 'conservative', social: {worker: -15, gov: -5, media: -10, rival: 5}},
                    {text: "推动全民免费接入，缩小认知鸿沟", wealth: -30, conflict: -20, tech: 10, routeTag: 'reformer', social: {worker: 15, gov: 15, media: 10, rival: -5}},
                    {text: "开源核心接口，让研究者自由改进", wealth: -15, conflict: -10, tech: 25, routeTag: 'technologist', social: {worker: 10, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "脑机接口是人类增强技术的最前沿。当技术可以改变人的认知能力时，如果只有少数人能负担得起，「生而平等」这一现代社会的基石将彻底崩塌。技术精英主义可能比任何时候都更危险。"
            },
            {
                name: "算法裁员",
                description: "你的HR系统引入了AI绩效评估。这套系统可以在1秒内分析数千名员工的工作数据，并给出裁员建议名单。管理层发现效率提高了，但员工士气降到了谷底。",
                historicalParallel: "2010年代各大企业引入AI人力资源管理系统：亚马逊、IBM等公司使用AI监控员工表现并辅助裁员决定，引发员工隐私和算法歧视的争议。",
                quote: { text: '"劳动用机器代替了手工劳动，但是，工人却变成了机器的单纯的附属品。"', author: '《共产党宣言》' },
                options: [
                    {text: "全面推行AI裁员，替换管理层的主观判断", wealth: 30, conflict: 25, tech: 10, routeTag: 'conservative', social: {worker: -25, gov: -5, media: -10, rival: 5}},
                    {text: "保留人工复核环节，保留员工申诉渠道", wealth: -10, conflict: -15, tech: 5, routeTag: 'reformer', social: {worker: 15, gov: 10, media: 10, rival: 0}},
                    {text: "将AI用于岗位匹配而非裁员，帮助员工转型", wealth: -15, conflict: -10, tech: 15, routeTag: 'technologist', social: {worker: 10, gov: 5, media: 5, rival: -5}}
                ],
                knowledge: "当AI介入劳动关系，资本对工人的控制从外部转向了内部。算法可以去人性化，但裁员的后果仍然由活生生的人来承担。问题是：我们能否设计出既不损害效率，又尊重人的尊严的劳动关系？"
            }
        ],
        // 路线专属事件池（由系统按条件注入）
        route: {
            conservative: {
                name: "殖民扩张",
                description: "你的资本积累需要新的原料产地和倾销市场，军方愿意为你保驾护航。",
                imageSvg: EventImages.colonial,
                historicalParallel: "19世纪末帝国主义瓜分非洲与亚洲：资本输出与军事侵略相伴而生。",
                quote: { text: '"资产阶级在它的不到一百年的阶级统治中所创造的生产力，比过去一切世代创造的全部生产力还要多，还要大。"', author: '马克思、恩格斯' },
                options: [
                    {text: "武力征服殖民地", wealth: 70, conflict: 30, tech: 5, routeTag: 'conservative', social: {worker: -15, gov: 5, media: -15, rival: 10}},
                    {text: "签订不平等贸易条约", wealth: 50, conflict: 20, tech: 0, routeTag: 'conservative', social: {worker: -10, gov: 0, media: -10, rival: 5}},
                    {text: "投资当地基础设施换取特权", wealth: 30, conflict: 10, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 5, rival: -5}}
                ],
                knowledge: "帝国主义阶段，资本输出取代商品输出成为主导。军事暴力与经济掠夺的结合，是垄断资本全球扩张的典型特征。"
            },
            technologist: {
                name: "数字垄断",
                description: "你的算法平台已经占据市场80%份额，监管机构正在调查你。",
                imageSvg: EventImages.digitalMonopoly,
                historicalParallel: "21世纪谷歌、亚马逊、腾讯等科技巨头的反垄断调查：数字资本的高度集中。",
                quote: { text: '"垄断是从自由竞争中成长起来的。"', author: '列宁' },
                options: [
                    {text: "收购所有潜在竞争对手", wealth: 40, conflict: 20, tech: 15, routeTag: 'technologist', social: {worker: -10, gov: -15, media: -10, rival: 20}},
                    {text: "开放部分API接口以避嫌", wealth: 20, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 10, media: 10, rival: -5}},
                    {text: "利用大数据构筑更高壁垒", wealth: 30, conflict: 10, tech: 25, routeTag: 'technologist', social: {worker: -5, gov: -5, media: 0, rival: 15}}
                ],
                knowledge: "数字资本通过平台垄断和数据壁垒形成'赢者通吃'的市场格局。技术本身成为垄断工具，加剧了资本集中和社会不平等。"
            },
            reformer: {
                name: "工会谈判",
                description: "工人联合会力量壮大，他们要求签订集体合同，否则将发动总罢工。",
                imageSvg: EventImages.unionNegotiation,
                historicalParallel: "20世纪欧美工会运动的兴起：工人阶级通过组织化斗争争取权益的重要历程。",
                quote: { text: '"无产者在这个革命中失去的只是锁链。他们获得的将是整个世界。"', author: '马克思、恩格斯' },
                options: [
                    {text: "拒绝谈判，分化工会", wealth: -10, conflict: 25, tech: 0, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -10, rival: 5}},
                    {text: "签订集体合同，提高福利", wealth: -30, conflict: -20, tech: 0, routeTag: 'reformer', social: {worker: 20, gov: 10, media: 10, rival: -5}},
                    {text: "引入自动化以削弱工会筹码", wealth: -20, conflict: 10, tech: 15, routeTag: 'technologist', social: {worker: -10, gov: 0, media: 0, rival: 5}}
                ],
                knowledge: "工会运动是工人阶级争取自身权益的重要手段。但在资本主义框架内，集体谈判只能缓和矛盾，无法根除剥削制度本身。"
            }
        },
        // 隐藏连锁事件
        hidden: {
            computeDictator: {
                name: "算力独裁",
                description: "由于你此前的技术垄断与全面AI化，社会已经形成了由算法控制的极端不平等结构。",
                imageSvg: EventImages.computeDictator,
                historicalParallel: "科幻作品中的'技术封建主义'想象：当资本逻辑与技术权力结合到极致的社会图景。",
                quote: { text: '"资本无法自行增殖，陷入死寂。"', author: '马克思主义学者对未来的预言' },
                options: [
                    {text: "维持算法统治", wealth: 30, conflict: 50, tech: 20, routeTag: 'technologist', social: {worker: -30, gov: -10, media: -15, rival: 20}},
                    {text: "将算力公有化", wealth: -50, conflict: -50, tech: 10, routeTag: 'reformer', social: {worker: 30, gov: 20, media: 20, rival: -10}}
                ],
                knowledge: "当生产资料（AI算力）高度集中到不再需要人类劳动者时，资本主义的雇佣劳动关系就彻底瓦解了。这要么通向'自由王国'，要么通向技术封建主义的深渊。"
            }
        },
        // 社会关系触发的特殊紧急事件
        special: {
            workerStrikeEmergency: {
                name: "总罢工",
                description: "由于你长期漠视工人权益，全国工会联合发动了总罢工，生产完全停滞。",
                imageSvg: EventImages.strike,
                historicalParallel: "19世纪末20世纪初欧美多次大罢工：工人阶级在极端压迫下的集体反抗。",
                quote: { text: '"全世界无产者，联合起来！"', author: '马克思、恩格斯' },
                options: [
                    {text: "武力清场，雇佣工贼", wealth: -20, conflict: 40, tech: 0, routeTag: 'conservative', social: {worker: -25, gov: -15, media: -15, rival: 10}},
                    {text: "全面妥协，签订最高福利合同", wealth: -40, conflict: -25, tech: 0, routeTag: 'reformer', social: {worker: 25, gov: 10, media: 15, rival: -5}}
                ],
                knowledge: "当劳资矛盾激化到顶点，和平的改良手段便失效了。总罢工是工人阶级展示其作为生产力主体的决定性力量的时刻。"
            },
            policyDividend: {
                name: "政策红利",
                description: "由于你与政府关系良好，当局推出了一系列有利于你企业的减税与补贴政策。",
                imageSvg: EventImages.bankCrisis,
                historicalParallel: "20世纪以来资本主义国家与企业之间的旋转门：政商关系对资本积累的重大影响。",
                quote: { text: '"现代的国家政权不过是管理整个资产阶级的共同事务的委员会罢了。"', author: '马克思、恩格斯' },
                options: [
                    {text: "扩大投资，垄断关键行业", wealth: 40, conflict: 15, tech: 10, routeTag: 'conservative', social: {worker: -10, gov: 10, media: -5, rival: 15}},
                    {text: "与政府合作建设公共工程", wealth: 20, conflict: -10, tech: 15, routeTag: 'reformer', social: {worker: 10, gov: 15, media: 10, rival: -5}}
                ],
                knowledge: "国家是阶级统治的工具。资产阶级国家通过政策手段维护资本利益，这在帝国主义阶段表现得尤为明显。"
            },
            // 纪元触发的特殊事件（game-lzk 扩展）
            epochSpecial: {
                assemblyLineAlgorithm: {
                    name: "流水线算法实验",
                    description: "你的顾问提议把工头的经验写进一套自动排班和绩效系统。它还不能称作 AI，却已经能预测谁会迟到、谁能被替换、谁最该被扣薪。工厂第一次开始像一个冷冰冰的判断装置。",
                    historicalParallel: "20世纪初科学管理运动的兴起：将管理者的经验转化为可量化的规则和指标，为后来的算法管理奠定了基础。",
                    quote: { text: '"劳动用机器代替了手工劳动，但是，工人却变成了机器的单纯的附属品。"', author: '《共产党宣言》' },
                    options: [
                        {text: "把系统推广到每个车间", wealth: 20, conflict: 15, tech: 10, routeTag: 'conservative', social: {worker: -10, gov: 0, media: -5, rival: 5}},
                        {text: "允许工人委员会参与监督算法", wealth: 5, conflict: -10, tech: 10, routeTag: 'reformer', social: {worker: 10, gov: 5, media: 5, rival: 0}},
                        {text: "终止实验，保留人工协商", wealth: -10, conflict: -5, tech: 5, routeTag: 'technologist', social: {worker: 5, gov: 0, media: 5, rival: -5}}
                    ],
                    knowledge: "算法管理并不始于大模型，而是始于资本把劳动过程拆解、量化、预测和替换的长期冲动。AI 只是让这种冲动获得了前所未有的速度和规模。",
                    question: "当工头被系统替代，工人的处境会更自由，还是更难与权力对话?"
                },
                computeFence: {
                    name: "算力围栏",
                    description: "你手中拥有最多的芯片、最快的模型和最厚的数据护城河。投资人催促你把基础模型封闭成收费关卡，让所有后来者都为接近智能而缴纳租金。",
                    historicalParallel: "21世纪科技巨头的平台垄断：通过控制基础设施和数据入口，形成数字时代的'圈地运动'。",
                    quote: { text: '"垄断是从自由竞争中成长起来的。"', author: '列宁' },
                    options: [
                        {text: "封闭模型，按层收费", wealth: 35, conflict: 20, tech: 10, routeTag: 'conservative', social: {worker: -5, gov: -10, media: -10, rival: 20}},
                        {text: "保留商用接口，但公开基础能力", wealth: 10, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 5, media: 5, rival: 0}},
                        {text: "把算力纳入公共基础设施试点", wealth: -15, conflict: -15, tech: 15, routeTag: 'technologist', social: {worker: 10, gov: 10, media: 10, rival: -10}}
                    ],
                    knowledge: "当 AI 的关键条件被垄断，资本逻辑不会失效，只会转化为对算力、模型和数据入口的租佃控制。所谓'智能普惠'，可能退化为数字地租。",
                    question: "如果每个人都离不开 AI，但 AI 的入口掌握在少数企业手里，这和旧时代的土地围栏有什么本质区别?"
                },
                publicComputeTrial: {
                    name: "公共算力试验",
                    description: "城市议会邀请你参与一项激进实验：把基础模型、算力中心与关键数据平台改造成公共设施，优先服务医疗、教育、交通与社区生产。利润不再是唯一评价标准。",
                    historicalParallel: "20世纪中后期部分国家的公共事业国有化运动：试图将关键生产资料从私人垄断中解放出来，服务于社会整体利益。",
                    quote: { text: '"在必然王国的彼岸，作为目的本身的人类能力的发展，真正的自由王国，就开始了。"', author: '马克思' },
                    options: [
                        {text: "接受试验，推动社会化调度", wealth: -10, conflict: -15, tech: 20, routeTag: 'technologist', social: {worker: 10, gov: 15, media: 10, rival: -10}},
                        {text: "保留混合模式，公共与商业并存", wealth: 10, conflict: -5, tech: 10, routeTag: 'reformer', social: {worker: 5, gov: 5, media: 5, rival: 0}},
                        {text: "拒绝试验，坚持私有化运营", wealth: 20, conflict: 15, tech: 5, routeTag: 'conservative', social: {worker: -10, gov: -10, media: -5, rival: 15}}
                    ],
                    knowledge: "AI 能否加速通向自由王国，不取决于它是否先进，而取决于它是否被纳入社会化占有和民主调度。只有在这种条件下，技术才可能真正缩短必要劳动时间。",
                    question: "如果 AI 能让社会少工作而多满足需求，谁应该决定它优先服务什么、节省下来的时间归谁?"
                },
                uselessClassNight: {
                    name: "无用阶级夜行",
                    description: "大批被替代者在城市边缘聚集。外卖骑手、客服、文员、程序员都发现自己正在被模型和自动流程挤出原来的位置。街头流传一句话：不是我们不会工作，而是资本不再需要我们。",
                    historicalParallel: "工业革命时期卢德运动与手工业者的衰落：技术进步在创造新财富的同时，也将大量劳动者抛入结构性失业的深渊。",
                    quote: { text: '"工人阶级的儿女从一出生就注定要成为资本的牺牲品。"', author: '恩格斯' },
                    options: [
                        {text: "加大监控和治安投入", wealth: 10, conflict: 25, tech: 5, routeTag: 'conservative', social: {worker: -20, gov: -5, media: -15, rival: 5}},
                        {text: "建立全民保障与再分配机制", wealth: -20, conflict: -20, tech: 10, routeTag: 'reformer', social: {worker: 20, gov: 15, media: 10, rival: -5}},
                        {text: "开放社区工坊与公共训练资源", wealth: -10, conflict: -15, tech: 15, routeTag: 'technologist', social: {worker: 15, gov: 10, media: 10, rival: -5}}
                    ],
                    knowledge: "AI 可能制造一种新的剩余人口形态。当资本对活劳动的需求下降，并不意味着人自动获得自由，反而可能意味着大规模排斥、失业与失去社会位置。",
                    question: "如果社会财富越来越依靠自动系统生产，那些被市场宣布'无用'的人，究竟是历史的负担，还是被错误制度排除在外的多数?"
                }
            }
        }
    };
}
