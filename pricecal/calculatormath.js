  /* ------------------
     Tweakable constants
     ------------------
    Your raw filament cost (what YOU pay). Example: $22/kg => $0.022/g
  */
    const COST_PER_G = 0.026; // CAD per gram (raw cost)
    //                   $26   / 1kg

    const MATERIAL_MARKUP = 4; // 3–5 is typical; 5 if you want to push it ( IN PERCENTTT %%%%)
    // Machine time rate (printing)

    const PRINT_RATE_PER_HOUR = 4; // CAD/hr (push as market tolerates)
    // Your hands-on labor rate (post-processing)
    const POST_RATE_PER_HOUR = 50; // CAD/hr (finishing is premium)

    // Map urgency level (0–3) to multiplier.
    // 0: no rush (x1), 1: x1.5, 2: x2, 3: x3
    const URGENCY_MULTS = [1, 1.5, 2, 3];

    const $ = (id) => document.getElementById(id);

    function currency(n) {
      return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'CAD' }).format(n);
    }

    function calc() {
      const printTime = Math.max(0, parseFloat($("printTime").value) || 0);
      const grams = Math.max(0, parseFloat($("grams").value) || 0);
      const postTime = Math.max(0, parseFloat($("postTime").value) || 0);

      let urgencyLevel = parseInt($("urgency").value, 10);
      if (isNaN(urgencyLevel)) urgencyLevel = 0;
      urgencyLevel = Math.min(3, Math.max(0, urgencyLevel));

      const materialSellPerG = COST_PER_G * MATERIAL_MARKUP;
      const materialCharge = grams * materialSellPerG;
      const machineCharge = printTime * PRINT_RATE_PER_HOUR;
      const postCharge = postTime * POST_RATE_PER_HOUR;

      const subtotal = materialCharge + machineCharge + postCharge;
      const multiplier = URGENCY_MULTS[urgencyLevel];
      const total = subtotal * multiplier;

      $("output").innerHTML = `
        <div>Material: ${currency(materialCharge)} (${grams.toFixed(0)} g @ ${currency(materialSellPerG)}/g)</div>
        <div>Print time: ${currency(machineCharge)} (${printTime.toFixed(2)} h @ ${currency(PRINT_RATE_PER_HOUR)}/h)</div>
        <div>Post-processing: ${currency(postCharge)} (${postTime.toFixed(2)} h @ ${currency(POST_RATE_PER_HOUR)}/h)</div>
        <div>Urgency: level ${urgencyLevel} (×${multiplier})</div>
        <hr/>
        <div><strong>Total: ${currency(total)}</strong></div>
      `;
    }

    ["printTime", "grams", "postTime", "urgency"].forEach(id => {
      $(id).addEventListener('input', calc);
      $(id).addEventListener('change', calc);
    });

    document.addEventListener('DOMContentLoaded', calc);