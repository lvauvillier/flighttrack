import DJIParser from 'dji-log-parser';

export default (flightLog, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    // init parser
    const parser = new DJIParser();

    // init frames
    let details;
    const frames = [];
    let currentFlyTime;
    let currentFrame;

    const newFrame = (flyTime) => {
      // Detect droped frames and fill it with a copy of the last frame
      if (frames.length && flyTime - currentFlyTime > 1) {
        const lastFrame = frames.slice(-1)[0];
        for (let i = currentFlyTime + 1; i < flyTime; i += 1) {
          frames.push(lastFrame);
        }
      }

      // Add a new frame
      currentFlyTime = flyTime;
      if (currentFrame) {
        frames.push(currentFrame);
      }
      currentFrame = {};
    };

    parser.on('DETAILS', (obj) => {
      details = {
        subStreet: obj.getSubStreet(),
        street: obj.getStreet(),
        city: obj.getCity(),
        area: obj.getArea(),
        longitude: obj.getLongitude(),
        latitude: obj.getLatitude(),
        totalDistance: obj.getTotalDistance(),
        totalTime: obj.getTotalTime(),
        maxHeight: obj.getMaxHeight(),
        maxHSpeed: obj.getMaxHSpeed(),
        maxVSpeed: obj.getMaxVSpeed(),
        updateTime: obj.getUpdateTime(),
        aircraftName: obj.getAircraftName(),
        appType: obj.getAppType(),
        appVersion: obj.getAppVersion(),
      };
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
    });

    parser.parse(reader.result);

    callback({
      title: flightLog.name,
      details,
      frames,
    });
  };
  reader.readAsArrayBuffer(flightLog);
};
