  navigator.getBattery().then(function(battery) {
      function updateAllBatteryInfo() {
        updateLevelInfo();
        updateChargingInfo();
        updateChargingTimeInfo();
        updateDischargingTimeInfo();
      }
      
      // runs everytime user connects or disconnects charger
      battery.addEventListener('chargingchange', function() {
        updateChargingInfo();
      });

      // runs every time battery level changes, eg changes to 36% from 35% 
      battery.addEventListener('levelchange', function() {
        updateLevelInfo();
      });

      // runs everytime time required to charge phone is changes
      battery.addEventListener('chargingtimechange', function() {
        updateChargingTimeInfo();
      });

      // runs everytime time required for the phone to be dead changes
      battery.addEventListener('dischargingtimechange', function() {
        updateDischargingTimeInfo();
      });

      function updateLevelInfo() {
        const batteryLevel = battery.level * 100;
        const batteryLevelDiv = document.getElementById('battery-level');
        batteryLevelDiv.style.width = batteryLevel + '%';

        if (batteryLevel <= 10) {
          batteryLevelDiv.className = 'red';
        } else if (batteryLevel <= 20) {
          batteryLevelDiv.className = 'green';
        } else {
          batteryLevelDiv.className = 'blue';
        }

        document.getElementById('battery-status').textContent = 'Battery Level: ' + batteryLevel + '%';
      }

      function updateChargingInfo() {
        const batteryDiv = document.getElementById('battery');
        if (battery.charging) {
          batteryDiv.classList.add('charging');
          document.getElementById('battery-status').textContent += ' (Charging)';
        } else {
          batteryDiv.classList.remove('charging');
        }
      }

      function updateChargingTimeInfo() {
        document.getElementById('charging-time').textContent = 'Charging Time: ' + battery.chargingTime + ' seconds';
      }

      function updateDischargingTimeInfo() {
        document.getElementById('discharging-time').textContent = 'Discharging Time: ' + battery.dischargingTime + ' seconds';
      }

      updateAllBatteryInfo();
    });