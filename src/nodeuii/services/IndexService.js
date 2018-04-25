
class IndexService {
    getData() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        { id: 1, title: '白日梦先生', content: '强壮先生的好朋友！' },
                        { id: 2, title: '健忘先生', content: '健忘是绝症，无药可救！' },
                        { id: 3, title: '颤抖先生', content: '抖抖更健康！' },
                        { id: 4, title: '噪音先生', content: '呀啦索，那就是青藏高原啊啊啊啊啊啊啊啊啊～' },
                        { id: 5, title: '不可能先生', content: 'Nothing Is Impossible！' },
                        { id: 6, title: '荒谬先生', content: '嗯。。。哦。。。' },
                        { id: 7, title: '公主小姐', content: '👸公主病，没救。' },
                        { id: 8, title: '颠倒小姐', content: '我癫癫又倒倒好比浪涛，有万般的委屈付之一笑！' }
                    ]
                );
            }, 1000);
        });
    }
}
export default IndexService;
