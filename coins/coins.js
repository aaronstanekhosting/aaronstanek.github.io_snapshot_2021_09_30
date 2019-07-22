function dg(x) {
  return document.getElementById(x);
}

function set_currency() {
  if (typeof COIN_VALUE == "undefined") {
    alert("The program did not fully load. Try reloading the page.");
    return;
  }
  var c = dg("u").value;
  if (c == "!") {
    dg("b").style.display = "none";
    return;
  }
  dg("b").style.display = "block";
  var z = dg("z");
  z.innerHTML = "";
  m.value = "";
  a.innerHTML = "";
  dg("h1").style.display = "none";
  dg("h2").style.display = "none";
  var spe = COIN_VALUE[c];
  var s;
  var t;
  if (dg("v").value == "A") {
    t = "checkbox";
    dg("h1").style.display = "inline";
  }
  else {
    t = "number";
    dg("h2").style.display = "inline";
  }
  for (let i = 1; i < spe.length; i++) {
    s = document.createElement("input");
    s.type = t;
    s.id = "c" + i;
    z.appendChild(s);
    s = document.createTextNode(" "+spe[i][0]);
    z.appendChild(s);
    s = document.createElement("br");
    z.appendChild(s);
  }
  ABUNDANCE = [];
  for (let i = 1; i < spe.length; i++) {
    ABUNDANCE.push(0);
  }
  if (t == "number") {return;}
  for (let i = 0; i < spe[0][2]; i++) {
    var k = i;
    for (let j = 1; j < spe.length; j++) {
      while (k >= spe[j][1]) {
        k -= spe[j][1];
        ABUNDANCE[j-1] += 1;
      }
    }
  }
}

function pick(n) {
  var c;
  if (n == 0) {
    c = false;
  }
  else {
    c = true;
  }
  for (let i = 1; i <= ABUNDANCE.length; i++) {
    dg("c"+i).checked = c;
  }
}

function validate() {
  if (dg("v").value == "A") {
    var have_coin = false;
    for (let i = 1; i <= ABUNDANCE.length; i++) {
      if (dg("c"+i).checked) {
        have_coin = true;
        break;
      }
    }
    if (have_coin != true) {
      dg("a").innerHTML = "Please select at least one type of coin.";
      return false;
    }
  }
  else {
    for (let i = 1; i <= ABUNDANCE.length; i++) {
      if (dg("c"+i).value == "") {
        dg("a").innerHTML = "Please enter how many of each coin you have in your sample.";
        return false;
      }
    }
  }
  if (dg("w").value == "!") {
    dg("a").innerHTML = "Please select your units.";
    return false;
  }
  if (dg("m").value == "") {
    dg("a").innerHTML = "Please input the weight of your coins.";
    return false;
  }
  return true;
}

function update_lims(v,m,lims) {
  var cr = v / m;
  if (lims[0] == null) {
    lims[0] = cr;
    lims[1] = cr;
    return;
  }
  if (cr < lims[0]) {lims[0] = cr;}
  if (cr > lims[1]) {lims[1] = cr;}
}

function estimate() {
  if (!validate()) {return;}
  var t_value = 0.0;
  var t_mass = 0.0;
  var lims = [null,null];
  var spe = COIN_VALUE[dg("u").value];
  if (dg("v").value == "A") {
    for (let i = 1; i < spe.length; i++) {
      if (dg("c"+i).checked) {
        t_value += ABUNDANCE[i-1] * spe[i][1];
        t_mass += ABUNDANCE[i-1] * spe[i][2];
        update_lims(spe[i][1],spe[i][2],lims);
      }
    }
  }
  else {
    for (let i = 1; i < spe.length; i++) {
      t_value += Number(dg("c"+i).value) * spe[i][1];
      t_mass += Number(dg("c"+i).value) * spe[i][2];
      update_lims(spe[i][1],spe[i][2],lims);
    }
  }
  var vpg = t_value / t_mass;
  var grams = Number(dg("m").value) * Number(dg("w").value);
  var ans = (vpg * grams) / spe[0][1];
  ans = Math.round(ans);
  lims[0] = Math.floor((lims[0]*0.9*grams) / spe[0][1]);
  lims[1] = Math.ceil((lims[1]*1.1*grams) / spe[0][1]);
  if (spe[0].length == 3) {
    ans = "Estimate:<br>" + spe[0][0] + ans + "<br><br>";
    ans += "Range:<br>"
    ans += spe[0][0] + lims[0] + " to " + spe[0][0] + lims[1];
  }
  else {
    ans = "Estimate:<br>" + ans + spe[0][0] + "<br><br>";
    ans += "Range:<br>"
    ans += lims[0] + spe[0][0]  + " to " + lims[1] + spe[0][0];
  }
  dg("a").innerHTML = ans;
}
