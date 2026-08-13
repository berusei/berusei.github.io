import type { ReactNode } from 'react';
import { factLink } from '../components/icons.tsx';

export interface ResumeEntry {
    readonly period: string;
    readonly org: string;
    readonly role?: string;
    readonly description: ReactNode;
    readonly current?: boolean;
}

export const resumeEntries: readonly ResumeEntry[] = [
    {
        period: '2022.12 -',
        org: '株式会社もばらぶ',
        role: 'バックエンドエンジニア',
        description: (
            <>
                LaravelやCodeIgniterを用いたWebサービスの開発・運用に従事。<br />
                {factLink('美容師向けの確定申告SaaS', 'https://mobalab.net/works/accountech/')}や、{factLink('選挙情報・献金管理サイト', 'https://mobalab.net/works/senkyocom/')}、{factLink('障害福祉サービス事業所の検索サイト', 'https://mobalab.net/works/fukucie/')}などといった複数のプロジェクトに携わる。<br />
                要件定義からリリース、テスト、レビューまでほぼ全工程をアジャイル開発で経験。<br />
                近頃はプロジェクト全体の方針により、生成AIも積極的に活用中。
            </>
        ),
        current: true,
    },
    {
        period: '2019.5 - 2022.11',
        org: '登録型派遣社員 兼 家業従事',
        role: 'テクニカルサポートオペレーター / 社内SE / OA事務など',
        description:
            '家業の経営状況の変化によりやむを得ず兼業しながら、派遣で社内SEやテクニカルサポートオペレーターに従事。不幸にもコロナ禍が直撃し、給付金や助成金に関する急務を担当する。',
    },
    {
        period: '2017.4 - 2019.3',
        org: '東京IT会計法律専門学校千葉校',
        role: 'ITビジネス学科',
        description:
            '情報処理技術者能力認定試験、C言語検定、Java検定などを取得。卒業制作では、Javaを使用した飲食店在庫管理システムをチームで開発。',
    },
    {
        period: '2015.10 - 2016.4',
        org: 'フリーター時代',
        role: '書店店員 / テレフォンオペレーター',
        description: '暗黒期。語られざる記憶。',
    },
    {
        period: '2015.4 - 2015.9',
        org: '日本工学院八王子専門学校',
        role: '情報処理科',
        description: 'C言語やJavaなどの講義に参加。MOSを取得。同年9月に経済的事由により中退。',
    },
    {
        period: '2012.4 - 2015.3',
        org: '千葉県立一宮商業高等学校',
        role: '情報処理科 / Visual Basic .NET',
        description: (
            <>
                3年間、電算部のプログラマーとして活動。<br />
                一般のカリキュラムには含まれない高度な資格勉強に励み、ITパスポートに合格。東京情報大学や全国商業高等学校協会が主催するプログラミングコンテスト等へ応募する。<br />
                2年生の時は入試・就職の際の面接対策アプリが団体優良賞を受賞し、3年生の時は自身がサブリーダーを務めた百人一首のゲームアプリが惜しくも優秀賞（2位）を受賞した。{factLink('当時の発表風景はこちら', 'https://www.youtube.com/watch?v=dkZON4t2Iu4')}。<br />
                他にも、文化祭でCinema4Dを使用した動画制作や、「総合実践」の授業で{factLink('町おこしのオリジナル番組制作', 'https://www.youtube.com/watch?v=EbMlihJFSM4')}をするなど、クリエイティブ方面でも幅広く活動した。
            </>
        ),
    },
    {
        period: '2011',
        org: '人生初のWebサイト製作',
        role: 'ホームページビルダー',
        description:
            'ねとらじで知り合った友人のJustin.tvやUstreamでの配信活動支援の為に、ライブ配信の埋め込み・視聴総合支援サイトを製作。HTMLやCSS、JavaScriptの基礎を学ぶ。',
    },
    {
        period: '2010',
        org: '初めて自分のパソコンを持つ',
        role: 'Windows7',
        description:
            '当時中学2年生。Skypeやオンラインゲーム、ニコニコ生放送やUstreamの視聴などをきっかけに、より深くインターネットの世界に没頭する。',
    },
    {
        period: '2006 - 2007',
        org: '初めてパソコンに触れる',
        role: 'Windows XP / Windows Me',
        description:
            '当時10歳。家族が購入したFMVのノートPCにて初めてパソコンに触れ、インターネットの世界へ飛び込む。その後、叔母の家にやってきたWindows MeのデスクトップPCを使い、YouTubeやニコニコ動画の視聴などを楽しむ。',
    },
    {
        period: '1996',
        org: '誕生',
        description: '千葉県鴨川市内の病院にて生まれる。',
    },
];

export const resumeNote = '職務経歴書をご希望の場合は、お気軽にお問い合わせください。';
