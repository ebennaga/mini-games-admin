const MENUBAR = [
    { active: '/icons/active/dashboard-active.png', icon: '/icons/navbar/dashboard.png', title: 'Dashboard', href: '/' },
    { active: '/icons/active/account-active.png', icon: '/icons/navbar/account.png', title: 'Account', href: '/account' },
    {
        active: '/icons/active/clientaccount-active.png',
        icon: '/icons/navbar/client-account.png',
        title: 'Client Account',
        href: '/client-account'
    },
    { active: '/icons/active/reconcile-active.png', icon: '/icons/navbar/reconcile.png', title: 'Reconcile', href: '/reconcile' },
    { active: '/icons/active/games-active.png', icon: '/icons/navbar/game.png', title: 'Games', href: '/games' },
    {
        active: '/icons/active/tournament.png',
        icon: '/icons/navbar/tournament.png',
        title: 'Tournament',
        href: '/tournament',
        dropdownList: [
            { title: 'Tournaments', href: '/tournament' },
            { title: 'Participant Tournament', href: '/tournament/participant-tournament' },
            { title: 'Client Tournament', href: '/tournament/client-tournament' }
        ]
    },
    { active: '/icons/active/redemption-active.png', icon: '/icons/navbar/redemption.png', title: 'Redemption', href: '/redemption' },
    {
        active: '/icons/active/content.png',
        icon: '/icons/navbar/content.png',
        title: 'Content',
        href: '/content',
        dropdownList: [
            { title: 'Banner', href: '/banner' },
            { title: 'Blogs', href: '/blogs' }
        ]
    },
    {
        active: '/icons/active/setting.png',
        icon: '/icons/navbar/setting.png',
        title: 'Settings',
        href: '/settings',
        dropdownList: [
            { title: 'Exchange Rates', href: '/exchange-rates' },
            { title: 'Location', href: '/settings/location' },

            { title: 'Product Prizes', href: '/settings/product-prizes' },
            { title: 'Roles', href: '/settings/roles' }
        ]
    }
];

export default MENUBAR;
