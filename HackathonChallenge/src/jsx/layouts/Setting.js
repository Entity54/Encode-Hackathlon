import React, { useState } from "react";

const Setting = () => {
  const [settingToggle, setSettingToggle] = useState(false);

  return (  
	<>
		<div className={`sidebar-right ${settingToggle ? "show" : ""}`}>
			<div className="bg-overlay" onClick={() => setSettingToggle(!settingToggle)}></div>
		</div>
	</>
  );
};

export default Setting;


