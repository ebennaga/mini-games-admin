const MENUBAR = [
    { icon: 'icons/navbar/dashboard.png', title: 'Dashboard', href: '/' },
    { icon: 'icons/navbar/account.png', title: 'Account', href: '/account' },
    { icon: 'icons/navbar/client-account.png', title: 'Client Account', href: '/client-account' },
    { icon: 'icons/navbar/reconcile.png', title: 'Reconcile', href: '/reconcile' },
    { icon: 'icons/navbar/game.png', title: 'Games', href: '/game' },
    {
        icon: 'icons/navbar/tournament.png',
        title: 'Tournament',
        href: '/tournament',
        dropdownList: [
            { title: 'Tournaments', href: '/tournament' },
            { title: 'Participant Tournament', href: '/tournament' },
            { title: 'Client Tournament', href: '/tournament' }
        ]
    },
    {
        icon: 'icons/navbar/content.png',
        title: 'Content',
        href: '/content',
        dropdownList: [
            { title: 'Banner', href: '/banner' },
            { title: 'Blogs', href: '/banner' }
        ]
    },
    {
        icon: 'icons/navbar/setting.png',
        title: 'Settings',
        href: '/setting',
        dropdownList: [
            { title: 'Exchange Rates', href: '/setting' },
            { title: 'Location', href: '/setting' },
            { title: 'Product Prizes', href: '/setting' },
            { title: 'Roles', href: '/setting' }
        ]
    }
];

export default MENUBAR;
