export interface Work {
    readonly kind: string;
    readonly year: string;
    readonly role: string;
    readonly title: string;
    readonly description: string;
    readonly tags: readonly string[];
    readonly href: string;
}

export const works: readonly Work[] = [
    {
        kind: 'Web App',
        year: '2026',
        role: '',
        title: 'KakologInfo',
        description:
            'PythonスクリプトによるWebスクレイピングで小一ヶ月かけて取得した約1.3億件の5ちゃんねる（旧：2ちゃんねる）のスレタイを検索できるサイト。DBの規模では自身が関わってきた中で最大だったので、バックエンド設計や技術選定などに時間を要しリリースまでが一苦労でした。',
        tags: ['Go', 'SQLite', 'Manticore Search'],
        href: 'https://kakolog.info/',
    },
    {
        kind: 'Web App',
        year: '2026',
        role: '',
        title: 'MateViewer',
        description:
            '某Android用専ブラからエクスポートしたZIPファイルの過去ログデータをブラウザ上で閲覧できるWebアプリ。元々はAndroidからiPhoneへの乗り換えをしたのはいいものの、やはりchMateぐらい使い勝手の良いアプリが恋しいと思って衝動的に製作した。キャッシュ管理にIndexeddbを使用し、非常に優秀だという事がわかった。',
        tags: ['TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS'],
        href: 'https://berusei.github.io/mateviewer/',
    },
    {
        kind: 'Web App',
        year: '2026',
        role: '',
        title: 'アニソンCD売り上げデータ保管庫(復刻版)',
        description:
            'かつて有志の方が公開していたアニソン専業歌手や声優アーティストのCD・ライブ円盤などの売上枚数が見れるブログサイトを、Wayback Machineからの情報を基にDBサイト風にブラッシュアップしたもの。さらなる利便性を求めて改良案を練ってます。',
        tags: ['TypeScript', 'React', 'Next.js'],
        href: 'https://berusei.github.io/anison-sales/',
    },
    {
        kind: 'Web Site',
        year: '2024',
        role: '',
        title: 'バンドリch.BBS 過去ログ倉庫',
        description:
            '閉鎖済の掲示板サイトにあったスレッドをWayback Machine上にあるものだけスクレイピングし、PythonスクリプトのBeautiful Soupなどでソースコードを整形させた上、当時のデザインを参考に可能な限り復元させた。当時はバイブコーディングがまだ無かったのでChatGPTのフリープランで壁打ちしながら自力で試行錯誤しながらやりました。このサイトはコロナ禍の時よく見てたのでほぼ自分専用みたいなものとして作ったが、訳あってジャンル離れした為ほぼ見る事はなかった。',
        tags: ['Python', 'HTML5', 'CSS3'],
        href: 'https://bangdreamchbbs.at-ninja.jp/',
    },
    {
        kind: 'Windows Software',
        year: '2013 - 2014',
        role: '',
        title: 'THE INTERVIEW+ / 百人一首の達人',
        description: 'いずれも高校時代に部活動の電算部で製作したもの。担当箇所のみ公開中。',
        tags: ['Visual Basic .NET', 'HTML5', 'CSS3'],
        href: 'https://github.com/berusei/densan-club',
    },
];
