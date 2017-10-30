import DJIParser from 'dji-log-parser';

export default (flightLog, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    // init parser
    const parser = new DJIParser();

    // init frames
    const infos = {};
    const frames = [];
    let currentFlyTime;
    let currentFrame;

    const newFrame = (flyTime) => {
      const lastFrame = frames.slice(-1)[0];

      // Detect droped frames and fill it with a copy of the last frame
      if (frames.length && flyTime - currentFlyTime > 1) {
        for (let i = currentFlyTime + 1; i < flyTime; i += 1) {
          frames.push(lastFrame);
        }
      }

      // Add a new frame
      currentFlyTime = flyTime;
      if (currentFrame) {
        frames.push({ ...lastFrame, ...currentFrame });
      }
      currentFrame = {};
    };

    parser.on('DETAILS', (obj) => {
      infos.subStreet = ''; // obj.getSubStreet();
      infos.street = obj.getStreet();
      infos.city = obj.getCity();
      infos.area = obj.getArea();
      infos.longitude = obj.getLongitude();
      infos.latitude = obj.getLatitude();
      infos.totalDistance = obj.getTotalDistance();
      infos.totalTime = obj.getTotalTime();
      infos.maxHeight = obj.getMaxHeight();
      infos.maxHSpeed = obj.getMaxHSpeed();
      infos.maxVSpeed = obj.getMaxVSpeed();
      infos.updateTime = obj.getUpdateTime();
      infos.aircraftName = ''; //obj.getAircraftName();
    });

    parser.on('RECOVER', (obj) => {
      infos.droneType = obj.getDroneType();
      infos.appType = obj.getAppType();
      infos.appVersion = obj.getAppVersion();
    });

    parser.on('OSD', (obj) => {
      newFrame(obj.getFlyTime() * 10);
      currentFrame.longitude = obj.getLongitude();
      currentFrame.latitude = obj.getLatitude();
      currentFrame.height = obj.getHeight();
      currentFrame.XspeedX = obj.getXSpeed();
      currentFrame.Yspeed = obj.getYSpeed();
      currentFrame.Zspeed = obj.getZSpeed();
      currentFrame.pitch = obj.getPitch();
      currentFrame.roll = obj.getRoll();
      currentFrame.yaw = obj.getYaw();
      currentFrame.gpsNum = obj.getGpsNum();
      currentFrame.flycState = obj.getFlycState();
    });

    parser.on('CENTER_BATTERY', (obj) => {
      currentFrame.relativeCapacity = obj.getRelativeCapacity();
    });

    /* parser.on('HOME', () => console.log('HOME'));
    parser.on('GIMBAL', () => console.log('GIMBAL'));
    parser.on('RC', () => console.log('RC'));
    parser.on('CENTER_BATTERY', () => console.log('CENTER_BATTERY'));
    parser.on('SMART_BATTERY', () => console.log('SMART_BATTERY'));
    parser.on('RC_GPS', () => console.log('RC_GPS'));
    parser.on('APP_GPS', () => console.log('APP_GPS'));
    parser.on('RECOVER', () => console.log('RECOVER'));
    parser.on('CUSTOM', () => console.log('CUSTOM'));
    parser.on('DEFORM', () => console.log('DEFORM'));
    parser.on('APP_TIP', () => console.log('APP_TIP'));
    parser.on('APP_WARN', () => console.log('APP_WARN'));
    */


    parser.parse(reader.result);

    callback({
      title: flightLog.name,
      infos,
      frames,
    });
  };
  reader.readAsArrayBuffer(flightLog);
};
