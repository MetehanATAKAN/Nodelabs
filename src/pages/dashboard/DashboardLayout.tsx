import { useState, useEffect, useMemo, useRef } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";
import { selectAuthUser } from "@/features/auth/model/selectors";
import { useSignOutMutation, useUserProfileQuery } from "@/features/auth";
import { CurrencySelector } from "@/features/currency/ui/CurrencySelector";
import { DateFormatSelector } from "@/features/dateFormat/ui/DateFormatSelector";
import { ThemeToggle } from "@/features/theme";
import { Logo } from "@/shared/ui/Logo/Logo";
import { cn } from "@/shared/lib/cn";
import dashboardIcon from "@/assets/Dashboard.png";
import transactionsIcon from "@/assets/Transactions.png";
import invoicesIcon from "@/assets/Invoices.png";
import myWalletIcon from "@/assets/MyWallet.png";
import settingsIcon from "@/assets/Settings.png";
import helpIcon from "@/assets/Help.png";
import logoutIcon from "@/assets/Logout.png";
import bingIcon from "@/assets/Bing.png";
import downIcon from "@/assets/Down.png";

type NavItem = {
  to: string;
  label: string;
  icon: string;
};

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/transactions": "Transactions",
  "/invoices": "Invoices",
  "/wallets": "My Wallets",
  "/settings": "Settings",
};

export function DashboardLayout() {
  const user = useAppSelector(selectAuthUser);
  const signOutMutation = useSignOutMutation();
  useUserProfileQuery();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(target) &&
        sidebarOpen
      ) {
        setSidebarOpen(false);
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menuOpen) {
          setMenuOpen(false);
        }
        if (sidebarOpen) {
          setSidebarOpen(false);
        }
        if (searchOpen) {
          setSearchOpen(false);
        }
      }
    }

    if (menuOpen || sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, sidebarOpen, searchOpen]);

  const currentPageTitle = useMemo(() => {
    return pageTitles[location.pathname] || "Dashboard";
  }, [location.pathname]);

  const navItems = useMemo<NavItem[]>(
    () => [
      { to: "/dashboard", label: "Dashboard", icon: dashboardIcon },
      { to: "/transactions", label: "Transactions", icon: transactionsIcon },
      { to: "/invoices", label: "Invoices", icon: invoicesIcon },
      { to: "/wallets", label: "My Wallets", icon: myWalletIcon },
      { to: "/settings", label: "Settings", icon: settingsIcon },
    ],
    []
  );

  return (
    <div className="flex h-screen bg-white dark:bg-slate-900 w-full max-w-full overflow-x-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        ref={sidebarRef}
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-[260px] shrink-0 flex-col border-r border-slate-200/70 dark:border-slate-700 bg-[#F7F8FA] dark:bg-slate-800 transform transition-transform duration-300 ease-in-out lg:transform-none",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:flex"
        )}
      >
        <div className="flex items-center justify-between px-6 pt-6 lg:block">
          <Logo />
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900"
            aria-label="Close sidebar"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav className="mt-8 flex-1 px-3" aria-label="Main navigation">
          <ul className="space-y-3" role="list">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-medium transition",
                      isActive
                        ? "bg-[#C8EE44] dark:bg-[#C8EE44] text-slate-900 dark:text-slate-900"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
                    )
                  }
                >
                  <img
                    src={item.icon}
                    alt={`${item.label} icon`}
                    className="h-4 w-4"
                  />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-3 pb-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          >
            <img src={helpIcon} alt="Help" className="h-4 w-4" />
            Help
          </button>
          <button
            type="button"
            onClick={() => {
              setSidebarOpen(false);
              signOutMutation.mutate();
            }}
            disabled={signOutMutation.isPending}
            className="mt-3 flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-50"
          >
            <img src={logoutIcon} alt="Logout" className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200/70 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex h-[72px] items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50"
                aria-label="Open sidebar"
                aria-expanded={sidebarOpen}
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {currentPageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shrink-0"
                aria-label="Search"
                aria-expanded={searchOpen}
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="hidden md:flex items-center gap-2">
                <CurrencySelector />
                <DateFormatSelector />
              </div>

              <ThemeToggle />

              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shrink-0"
                aria-label="Notifications"
              >
                <img
                  src={bingIcon}
                  alt="Notifications icon"
                  className="h-4 w-4"
                />
              </button>

              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center gap-2 sm:gap-3 rounded-[100px] bg-[#FAFAFA] dark:bg-slate-700 px-2 sm:px-3 py-2 text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                >
                  <span className="inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-200 shrink-0">
                    {(user?.fullName ?? "U")
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((p) => p[0]?.toUpperCase())
                      .join("")}
                  </span>
                  <span className="hidden sm:block max-w-[120px] lg:max-w-[160px] truncate text-sm font-medium text-slate-900 dark:text-white">
                    {user?.fullName ?? "User"}
                  </span>
                  <img
                    src={downIcon}
                    alt=""
                    aria-hidden="true"
                    className="hidden sm:block h-2 w-2 shrink-0"
                  />
                </button>

                {menuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-[240px] rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-1 shadow-lg z-50"
                  >
                    <div className="md:hidden px-3 py-2 border-b border-slate-200">
                      <CurrencySelector />
                    </div>
                    <div className="md:hidden px-3 py-2 border-b border-slate-200">
                      <DateFormatSelector />
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        signOutMutation.mutate();
                      }}
                      disabled={signOutMutation.isPending}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50"
                      role="menuitem"
                    >
                      <img
                        src={logoutIcon}
                        alt="Logout icon"
                        className="h-4 w-4"
                      />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-y-auto bg-white dark:bg-slate-900">
          <div className="w-full max-w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
