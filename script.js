document.addEventListener('DOMContentLoaded', function() {
        const alarmList = document.getElementById('alarm-list');
        const alarmTimeInput = document.getElementById('alarm-time');
        const alarmMessageInput = document.getElementById('alarm-message');
        const addAlarmBtn = document.getElementById('add-alarm');
        
        // Load alarms from localStorage
        let alarms = JSON.parse(localStorage.getItem('alarms')) || [];
        
        // Display existing alarms
        function displayAlarms() {
          alarmList.innerHTML = '';
          
          if (alarms.length === 0) {
            alarmList.innerHTML = '<p>No alarms set yet. Add your first alarm!</p>';
            return;
          }
          
          alarms.forEach((alarm, index) => {
            const alarmItem = document.createElement('div');
            alarmItem.className = 'alarm-item';
            
            const alarmInfo = document.createElement('div');
            alarmInfo.innerHTML = `
              <div class="alarm-time">${alarm.time}</div>
              <div class="alarm-message">${alarm.message}</div>
            `;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteAlarm(index);
            
            alarmItem.appendChild(alarmInfo);
            alarmItem.appendChild(deleteBtn);
            alarmList.appendChild(alarmItem);
          });
        }
        
        // Add new alarm
        function addAlarm() {
          const time = alarmTimeInput.value;
          const message = alarmMessageInput.value.trim();
          
          if (!time || !message) {
            alert('Please enter both time and message');
            return;
          }
          
          alarms.push({ time, message });
          localStorage.setItem('alarms', JSON.stringify(alarms));
          
          alarmTimeInput.value = '';
          alarmMessageInput.value = '';
          
          displayAlarms();
        }
        
        // Delete alarm
        function deleteAlarm(index) {
          alarms.splice(index, 1);
          localStorage.setItem('alarms', JSON.stringify(alarms));
          displayAlarms();
        }
        
        // Check alarms periodically
        function checkAlarms() {
          const now = new Date();
          const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
          
          alarms.forEach(alarm => {
            if (alarm.time === currentTime) {
              alert(`Alarm: ${alarm.message}`);
            }
          });
        }
        
        // Event listeners
        addAlarmBtn.addEventListener('click', addAlarm);
        
        // Check alarms every minute
        setInterval(checkAlarms, 60000);
        
        // Initial display
        displayAlarms();
      });
