export type LanguageCode = 'en' | 'ko' | 'ja' | 'zh';


export interface FooterStrings {
    cart: string;
    calculate: string;
    orderHistory: string;
    selectLanguage: string;
    close: string;
};

export interface NavStrings {
    allMenu: string;
    callWaiter: string;
};

export interface TableIndicatorStrings {
    table: string;
};

export interface CartOrderStrings {
    title: string;
    empty: string;
    totalOrders: string;
    totalPrice: string;
    cancel: string;
    order: string;
    toastOrderComplete: string;
    freeService: string;
};

export const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ko", label: "한국어" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
];

export const FooterLocales: Record<LanguageCode, FooterStrings> = {
  en: {
    cart: "Cart",
    calculate: "Calculate",
    orderHistory: "Order History",
    selectLanguage: "Select Language",
    close: "Close",
  },
  ko: {
    cart: "장바구니",
    calculate: "계산",
    orderHistory: "주문 내역",
    selectLanguage: "언어 선택",
    close: "닫기",
  },
  ja: {
    cart: "カート",
    calculate: "計算する",
    orderHistory: "注文履歴",
    selectLanguage: "言語を選択",
    close: "閉じる",
  },
  zh: {
    cart: "购物车",
    calculate: "计算",
    orderHistory: "订单历史",
    selectLanguage: "选择语言",
    close: "关闭",
  },
};

export const NavLocales: Record<LanguageCode, NavStrings> = {
  en: {
    allMenu: "All Menu",
    callWaiter: "Call Waiter",
  },
  ko: {
    allMenu: "전체 메뉴",
    callWaiter: "직원 호출",
  },
  ja: {
    allMenu: "すべてのメニュー",
    callWaiter: "スタッフを呼ぶ",
  },
  zh: {
    allMenu: "所有菜单",
    callWaiter: "呼叫服务员",
  },
};

export const TableIndicatorLocales: Record<LanguageCode, TableIndicatorStrings> = {
    en: {
        table: "Table"
    },
    ko: {
        table: "테이블"
    },
    ja: {
        table: "テーブル"
    },
    zh: {
        table: "桌子"
    }
};

export const CartOrderLocales: Record<LanguageCode, CartOrderStrings> = {
  en: {
    title: "Cart",
    empty: "Cart is Empty.",
    totalOrders: "Total orders",
    totalPrice: "Total Price ₱",
    cancel: "Cancel",
    order: "Order",
    toastOrderComplete: "Order Complete. Please wait for a while..",
    freeService: "Free service can only be ordered 1 at a time.",
  },
  ko: {
    title: "장바구니",
    empty: "장바구니가 비어 있습니다.",
    totalOrders: "총 주문 수",
    totalPrice: "총 가격 ₱",
    cancel: "닫기",
    order: "주문하기",
    toastOrderComplete: "주문이 완료되었습니다. 잠시만 기다려주세요.",
    freeService: "무료 서비스는 한 번에 하나만 주문할 수 있습니다.",
  },
  ja: {
    title: "カート",
    empty: "カートは空です。",
    totalOrders: "総注文数",
    totalPrice: "合計金額 ₱",
    cancel: "キャンセル",
    order: "注文",
    toastOrderComplete: "注文が完了しました。しばらくお待ちください。",
    freeService: "無料サービスは一度に1つしか注文できません。",
  },
  zh: {
    title: "购物车",
    empty: "购物车为空。",
    totalOrders: "订单总数",
    totalPrice: "总价格 ₱",
    cancel: "取消",
    order: "下单",
    toastOrderComplete: "订单已完成。请稍候...",
    freeService: "免费服务每次只能订购一个。",
  },
};
