import React, { useContext } from "react";

/// React router dom
import {  Switch, Route } from "react-router-dom";
  
/// Css 
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Header from "./layouts/nav/Header";
import NAV_NavHade from "./layouts/nav/NavHader";
import NAV_SideBar from "./layouts/nav/SideBar";
import Footer from "./layouts/Footer";
/// Dashboard
import DashboardDark from "./components/Dashboard/DashboardDark";
    import DEX from "./components/Dashboard/DEX";
    import LOANS from "./components/Dashboard/LOANS";
    import VAULTS from "./components/Dashboard/VAULTS";
import Portofolio from "./components/Dashboard/Portofolio";
    import SOCIAL from "./components/Dashboard/SOCIAL";
    import GOALS from "./components/Dashboard/GOALS";


import ProductGrid from "./components/AppsMenu/Shop/ProductGrid/ProductGrid";
//Redux
import Todo from "./pages/Todo";
import ReduxForm from "./components/Forms/ReduxForm/ReduxForm";
import WizardForm from "./components/Forms/ReduxWizard/Index";
/// Widget
import Widget from "./pages/Widget";

import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";

const Markup = ( { setupSpecs, blockChainSpecs, blockHeader, blockTimestamp, evm_api_state, extension
        , accountList, setSubstrateAccount, selectedAddress, selectedAccountName, selected_EVM_Address
        , customerPortfolio, message_1, oraclePrices, customerPortfolioAnalytics, total_CoinSupply
        , customerLoans, loansOverviews }) => {

  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    ///Redux
    { url: "todo", component: Todo },
    { url: "redux-form", component: ReduxForm },
    { url: "redux-wizard", component: WizardForm },
    /// Widget
    { url: "widget-basic", component: Widget },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div id={`${!pagePath ? "main-wrapper" : ""}`} className={`${!pagePath ? "show" : "mh100vh"}  ${menuToggle ? "menu-toggle" : ""}`}>
        
        {!pagePath && <Header setupSpecs={setupSpecs} evm_api_state={evm_api_state} blockHeader={blockHeader}  accountList={accountList}  setSubstrateAccount={setSubstrateAccount} selectedAddress={selectedAddress} selectedAccountName={selectedAccountName} selected_EVM_Address={selected_EVM_Address} oraclePrices={oraclePrices} />}
        {!pagePath && <NAV_NavHade setupSpecs={setupSpecs} blockHeader={blockHeader}  accountList={accountList} selectedAddress={selectedAddress} />}
        {!pagePath && <NAV_SideBar setupSpecs={setupSpecs} blockHeader={blockHeader}  accountList={accountList} selectedAddress={selectedAddress} />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              <Route exact path='/dashboard-dark'> <DashboardDark setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} oraclePrices={oraclePrices} total_CoinSupply={total_CoinSupply} customerPortfolioAnalytics={customerPortfolioAnalytics} /> </Route>
              <Route exact path='/dex'> <DEX  setupSpecs={setupSpecs} blockHeader={blockHeader} selectedAddress={selectedAddress} oraclePrices={oraclePrices} customerPortfolio={customerPortfolio} /> </Route>
              <Route exact path='/loans'> <LOANS   setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} selectedAddress={selectedAddress} customerLoans={customerLoans} loansOverviews={loansOverviews} oraclePrices={oraclePrices} /> </Route>
              <Route exact path='/vaults'> <VAULTS   setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} /> </Route>
              <Route exact path='/portofolio'> <Portofolio  setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} selectedAddress={selectedAddress} selectedAccountName={selectedAccountName} selected_EVM_Address={selected_EVM_Address} customerPortfolio={customerPortfolio} message_1={message_1} oraclePrices={oraclePrices} customerPortfolioAnalytics={customerPortfolioAnalytics} /> </Route>
              <Route exact path='/social'> <SOCIAL   setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList}/> </Route>
              <Route exact path='/goals'> <GOALS   setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} extension={extension}   selectedAddress={selectedAddress}  /> </Route>
              <Route exact path='/ecom-product-grid'> <ProductGrid   setupSpecs={setupSpecs} blockChainSpecs={blockChainSpecs} blockHeader={blockHeader} blockTimestamp={blockTimestamp} extension={extension} accountList={accountList} /> </Route>
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <Setting />
    </>
  );
};

export default Markup;
