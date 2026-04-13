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
            }
        }
    };
}
