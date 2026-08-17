import type { ReactNode } from 'react';

export interface WorkShot {
    readonly src: string;
    readonly alt: string;
}

export interface Work {
    readonly kind: string;
    readonly year: string;
    readonly title: string;
    readonly description: ReactNode;
    readonly tags: readonly string[];
    readonly site: string;
    readonly repo: string;
    readonly shot?: WorkShot;
}

export const works: readonly Work[] = [
    {
        kind: 'Web App',
        year: '2026',
        title: 'KakologInfo',
        description: (
            <>
                PythonスクリプトによるWebスクレイピングで小一ヶ月かけて取得した約1.3億件の5ちゃんねる（旧：2ちゃんねる）のスレタイを検索できるサイト。<br />
                DBの規模では自身が関わってきた中で最大だったので、バックエンド設計や技術選定などに時間を要しリリースまでが一苦労でした。
            </>
        ),
        tags: ['Go', 'SQLite', 'Manticore Search'],
        site: 'https://kakolog.info/',
        repo: 'https://github.com/berusei/kakologinfo',
        shot: { src: 'works/img_kakologinfo.png', alt: 'KakologInfoのスクリーンショット' },
    },
    {
        kind: 'Web App',
        year: '2026',
        title: 'MateViewer',
        description: (
            <>
                某Android用専ブラからエクスポートしたZIPファイルの過去ログデータをブラウザ上で閲覧できるWebアプリ。<br />
                元々はAndroidからiPhoneへの乗り換えをきっかけに、やはりchMateぐらい使い勝手の良いアプリが恋しいと思って衝動的に製作した。<br />
                リードした各スレッドデータの永続化に使用したIndexeddbが非常に優秀だという事がわかった。
            </>
        ),
        tags: ['TypeScript', 'React', 'Next.js', 'Vite', 'Tailwind CSS'],
        site: 'https://berusei.github.io/mateviewer/',
        repo: 'https://github.com/berusei/mateviewer',
        shot: { src: 'works/img_mateviewer.png', alt: 'MateViewerのページスクリーンショット' },
    },
    {
        kind: 'Web Site',
        year: '2026',
        title: 'アニソンCD売り上げデータ保管庫(復刻版)',
        description: (
            <>
                かつて有志の方が公開していたアニソン専業歌手や声優アーティストのCD・DVD/BDなどの売上枚数が見れるブログを、Wayback Machineからの情報を基にDBサイト風にブラッシュアップしたもの。<br />
                さらなる利便性を求めて改良案を練ってます。
            </>
        ),
        tags: ['TypeScript', 'React', 'Next.js'],
        site: 'https://berusei.github.io/anison-sales/',
        repo: 'https://github.com/berusei/anison-sales',
    },
    {
        kind: 'Web Site',
        year: '2024',
        title: 'バンドリch.BBS 過去ログ倉庫',
        description: (
            <>
                Wayback Machine上で記録されている閉鎖済の掲示板サイトのスレッド（トピック）をスクレイピングし、PythonスクリプトのBeautiful Soupなどでソースコードを整形させた上、当時のデザインを参考に可能な限り復元させた。<br />
                当時はバイブコーディングがまだ無かったのでChatGPTのフリープランで壁打ちしながら自力で試行錯誤しながらやりました。<br />
                このサイトはコロナ禍の時よく見てたのでほぼ自分用みたいなものとして作ったが、訳あってジャンル離れした為現在はほぼ見る事はない。
            </>
        ),
        tags: ['Python', 'HTML5', 'CSS3'],
        site: 'https://bangdreamchbbs.at-ninja.jp/',
        repo: '',
    },
    {
        kind: 'Windows Software',
        year: '2013 - 2014',
        title: 'THE INTERVIEW+ / 百人一首の達人',
        description: 'いずれも高校時代に部活動の電算部で製作したもの。担当箇所のみ公開中。',
        tags: ['Visual Basic .NET', 'HTML5', 'CSS3'],
        site: '',
        repo: 'https://github.com/berusei/densan-club',
    },
];
