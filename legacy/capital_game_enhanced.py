import random
import time

class CapitalGameEnhanced:
    def __init__(self):
        # 游戏属性
        self.wealth = 100  # 财富值
        self.social_conflict = 30  # 社会矛盾值
        self.tech_power = 50  # 技术力
        self.epoch = 1  # 当前纪元
        self.history = []  # 游戏历史记录
        self.rounds = 0  # 游戏回合数
        
        # 游戏事件库（扩展版）
        self.events = {
            1: [
                {
                    "name": "圈地运动",
                    "description": "你发现了一片公共土地，如果将其私有化建立工厂，能获得巨大财富，但流离失所的农民会涌入城市。",
                    "options": [
                        {"text": "暴力强占", "wealth": 50, "conflict": 20, "tech": 0},
                        {"text": "支付补偿金缓慢收购", "wealth": 20, "conflict": 5, "tech": 0},
                        {"text": "保持公地，投资手工业", "wealth": 10, "conflict": 0, "tech": 5}
                    ],
                    "knowledge": "唯物史观：生产力的发展（机器工业）必然要求变革生产关系（私有制取代公有制）。资本原始积累的过程伴随着血腥与暴力。"
                },
                {
                    "name": "工人罢工",
                    "description": "工人们要求提高工资和改善工作条件，否则将举行大规模罢工。",
                    "options": [
                        {"text": "镇压罢工，雇佣新工人", "wealth": -10, "conflict": 25, "tech": 0},
                        {"text": "妥协，小幅提高工资", "wealth": -20, "conflict": -10, "tech": 0},
                        {"text": "投资自动化设备替代工人", "wealth": -30, "conflict": 15, "tech": 10}
                    ],
                    "knowledge": "剩余价值理论：资本家通过延长劳动时间或提高劳动强度来获取更多剩余价值，这必然导致劳资矛盾的激化。"
                }
            ],
            2: [
                {
                    "name": "经济危机",
                    "description": "生产的商品堆积如山，但底层工人买不起。库存积压，资金链即将断裂。",
                    "options": [
                        {"text": "销毁库存，维持价格", "wealth": -20, "conflict": 30, "tech": 0},
                        {"text": "降价倾销，开拓海外市场", "wealth": -10, "conflict": 0, "tech": 5},
                        {"text": "提高工人工资，扩大内需", "wealth": -30, "conflict": -15, "tech": 0}
                    ],
                    "knowledge": "生产社会化与生产资料私有制的基本矛盾。资本主义无法消灭相对过剩人口和消费不足的痼疾。"
                },
                {
                    "name": "技术革命",
                    "description": "新的生产技术出现，可以大幅提高生产效率，但需要大量投资。",
                    "options": [
                        {"text": "全力投资新技术", "wealth": -40, "conflict": 10, "tech": 25},
                        {"text": "保守投资，逐步更新", "wealth": -20, "conflict": 5, "tech": 15},
                        {"text": "维持现状，不投资", "wealth": 0, "conflict": 0, "tech": 0}
                    ],
                    "knowledge": "生产力决定生产关系。技术革命推动生产力发展，但资本主义生产关系可能成为生产力发展的桎梏。"
                }
            ],
            3: [
                {
                    "name": "人工智能取代人力",
                    "description": "你研发出了通用人工智能（AGI），可以取代90%的工人。效率极高，但剩下的10%工人面临绝境。",
                    "options": [
                        {"text": "全面推行AI，解雇所有工人", "wealth": 50, "conflict": 99, "tech": 30},
                        {"text": "推行机器人税，将利润分配给全民", "wealth": 20, "conflict": -20, "tech": 20},
                        {"text": "利用AI进行计划经济，弱化市场调节", "wealth": 0, "conflict": -30, "tech": 30}
                    ],
                    "knowledge": "AI时代，资本逻辑非但没有失效，反而强化了。当生产资料高度集中时，资本主义的雇佣劳动关系就瓦解了。"
                },
                {
                    "name": "全球气候危机",
                    "description": "气候变化导致极端天气频发，社会要求企业承担更多环保责任。",
                    "options": [
                        {"text": "无视环保要求，继续追求利润", "wealth": 30, "conflict": 40, "tech": 0},
                        {"text": "投资绿色技术，逐步转型", "wealth": -20, "conflict": -10, "tech": 15},
                        {"text": "全面转向可持续发展", "wealth": -40, "conflict": -20, "tech": 25}
                    ],
                    "knowledge": "资本主义的生产方式与生态环境之间存在根本矛盾。无限扩张的资本逻辑与有限的自然资源之间存在不可调和的冲突。"
                }
            ]
        }
    
    def display_status(self):
        print(f"\n{'='*50}")
        epoch_names = {1: "原始积累纪元", 2: "工业垄断纪元", 3: "AI数字纪元"}
        print(f"=== {epoch_names[self.epoch]} (第{self.rounds}回合) ===")
        
        # 用进度条显示属性
        print(f"财富值: {self.wealth} {'█' * (self.wealth // 20)}")
        print(f"社会矛盾: {self.social_conflict} {'█' * (self.social_conflict // 20)}")
        print(f"技术力: {self.tech_power} {'█' * (self.tech_power // 20)}")
        
        # 警告提示
        if self.social_conflict >= 70:
            print("⚠️  警告: 社会矛盾极高，革命风险增加!")
        if self.wealth <= 30:
            print("⚠️  警告: 财富值过低，破产风险增加!")
    
    def check_game_over(self):
        if self.social_conflict >= 100:
            return "无产阶级革命爆发，资本主义制度被推翻"
        if self.wealth <= 0:
            return "经济危机导致破产，资本积累失败"
        if self.rounds >= 6:  # 最多6个回合
            return "历史周期结束"
        return None
    
    def get_random_event(self):
        events = self.events.get(self.epoch, [])
        if events:
            return random.choice(events)
        return None
    
    def handle_event(self, event):
        print(f"\n🎯 事件: {event['name']}")
        print(f"📖 {event['description']}")
        print("\n请选择你的行动:")
        
        for i, option in enumerate(event['options'], 1):
            wealth_change = f"+{option['wealth']}" if option['wealth'] >= 0 else str(option['wealth'])
            conflict_change = f"+{option['conflict']}" if option['conflict'] >= 0 else str(option['conflict'])
            tech_change = f"+{option['tech']}" if option['tech'] >= 0 else str(option['tech'])
            
            print(f"{i}. {option['text']} (财富{wealth_change}, 矛盾{conflict_change}, 技术{tech_change})")
        
        while True:
            try:
                choice = int(input("\n请输入选项编号 (1-3): "))
                if 1 <= choice <= 3:
                    selected_option = event['options'][choice-1]
                    
                    # 更新属性
                    old_wealth, old_conflict, old_tech = self.wealth, self.social_conflict, self.tech_power
                    self.wealth += selected_option["wealth"]
                    self.social_conflict += selected_option["conflict"]
                    self.tech_power += selected_option["tech"]
                    
                    # 记录历史
                    self.history.append({
                        "epoch": self.epoch,
                        "event": event['name'],
                        "choice": selected_option['text'],
                        "knowledge": event['knowledge'],
                        "changes": {
                            "wealth": selected_option["wealth"],
                            "conflict": selected_option["conflict"],
                            "tech": selected_option["tech"]
                        }
                    })
                    
                    # 显示结果
                    print(f"\n📊 结果:")
                    print(f"财富: {old_wealth} → {self.wealth}")
                    print(f"社会矛盾: {old_conflict} → {self.social_conflict}")
                    print(f"技术力: {old_tech} → {self.tech_power}")
                    
                    # 显示知识点
                    print(f"\n📚 马克思主义知识点:")
                    print(f"{event['knowledge']}")
                    
                    time.sleep(1)  # 暂停一下让玩家阅读
                    
                    # 推进纪元（每2个回合推进一次）
                    self.rounds += 1
                    if self.rounds % 2 == 0 and self.epoch < 3:
                        self.epoch += 1
                        print(f"\n🚀 进入{['原始积累', '工业垄断', 'AI数字'][self.epoch-1]}纪元!")
                    
                    break
            except ValueError:
                print("请输入有效的数字!")
    
    def determine_ending(self):
        if self.social_conflict >= 80 and self.wealth >= 200:
            return "技术封建主义", "\n💀 坏结局: 你成为了掌握AI算力资源的数字领主。但99%的人口因失业而沦为无用阶级，社会消费能力崩溃。资本逻辑走向终点：资本无法自行增殖，陷入死寂。"
        elif self.social_conflict <= 40 and self.wealth >= 150:
            return "福利国家的乌托邦", "\n⚖️ 普通结局: 你建立了北欧式的高福利社会，矛盾缓和，但资本主义私有制依然存在。虽然看似美好，但根本矛盾（资本增殖）并未消除，只是被延迟。"
        elif self.tech_power >= 100 and self.social_conflict <= 30:
            return "自由人联合体", "\n🌟 真结局: 由于生产力的极度发达（AI全面应用），物质极大丰富。生产资料私有制失去了存在的意义。你主动将生产资料交予联合体管理，实现了从资本的联合到人的联合的转变。"
        else:
            return "资本主义的终结", "\n📉 普通结局: 你的资本主义道路走到了尽头。历史证明，资本主义的内在矛盾无法在资本主义框架内得到根本解决。"
    
    def show_history(self):
        print("\n📜 游戏历史回顾:")
        for i, record in enumerate(self.history, 1):
            print(f"\n{i}. {record['event']}")
            print(f"   选择: {record['choice']}")
            print(f"   知识点: {record['knowledge']}")
    
    def play_game(self):
        print("🎮 === 《资本：轮回与破局》 ===")
        print("作为一名资本家，你的目标是积累财富，但要注意社会矛盾的激化!")
        print("游戏将经历三个历史纪元，你的选择将决定资本主义的命运。")
        print("="*50)
        
        input("按回车键开始游戏...")
        
        while True:
            self.display_status()
            
            # 检查游戏结束条件
            game_over_reason = self.check_game_over()
            if game_over_reason:
                print(f"\n{'='*50}")
                print("🎭 游戏结束!")
                print(f"原因: {game_over_reason}")
                
                if game_over_reason == "历史周期结束":
                    ending_name, ending_desc = self.determine_ending()
                    print(f"结局: {ending_name}")
                    print(ending_desc)
                
                # 显示马克思主义经典语录
                print("\n💡 马克思主义经典语录:")
                print("'在必然王国的彼岸，作为目的本身的人类能力的发展，真正的自由王国，就开始了。' —— 马克思")
                print("'社会主义社会不是从原则出发，而是从事实出发。' —— 恩格斯")
                
                self.show_history()
                break
            
            # 获取随机事件
            event = self.get_random_event()
            if event:
                self.handle_event(event)
            else:
                self.rounds += 1
                if self.rounds % 2 == 0 and self.epoch < 3:
                    self.epoch += 1

# 运行游戏
if __name__ == "__main__":
    game = CapitalGameEnhanced()
    game.play_game()