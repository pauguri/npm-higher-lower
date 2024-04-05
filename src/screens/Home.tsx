import './Home.css';

export default function Home() {
  return (
    <div className="modal start-wrapper visible">
      <img id="logo" src="./img/logo.png" alt="logo" draggable="false" />
      <div>Posa a prova el teu coneixement dels municipis de Catalunya!<br />Té més habitants <span id="sm1" className="sample-mun"></span> o <span id="sm2" className="sample-mun"></span>?</div>
      <div className="start-btns">
        <div className="start-section">
          <button onclick="handleStart(true)" disabled>JUGAR<br /><span>Tot Catalunya</span></button>
        </div>
        <div className="separator"></div>
        <form action="javascript:void(0)" className="start-section" onsubmit="return handleStart(false, this.elements[0].value)">
          <select name="com-select" id="com-select" required disabled>
            <option value="0">Tria una comarca</option>
          </select>
          <button type="submit" id="com-select-submit" style={{ display: 'none' }}>JUGAR<br /><span>Tria una comarca</span></button>
        </form>
      </div>
      <div className="hs-list-btn" onclick="expandHsList(this)"><i className="fas fa-crown"></i> <span>Els meus rècords</span></div>
      <div className="hs-list collapsed">

      </div>
    </div>
  )
}
