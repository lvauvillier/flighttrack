import DJIParser from 'dji-log-parser';

export default (flightLog, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    // init parser
    const parser = new DJIParser();

    // init frames
    const frames = {};
    let details;
    let currentFlyTime = 0;

    const setCurrentFlyTime = (flyTime) => {
      frames.start = frames.start ? frames.start : flyTime;
      frames.end = flyTime;
      // Detect droped frames and fill it with a copy of the current frame
      if (currentFlyTime > 0) {
        for (let i = currentFlyTime + 1; i < flyTime; i += 1) {
          frames[i] = frames[currentFlyTime];
        }
      }
      currentFlyTime = flyTime;
    };

    // add property
    const addToCurrentFrame = (key, value) => {
      frames[currentFlyTime] = frames[currentFlyTime] ? frames[currentFlyTime] : {};
      frames[currentFlyTime][key] = value;
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
      setCurrentFlyTime(obj.getFlyTime() * 10);
      addToCurrentFrame('longitude', obj.getLongitude());
      addToCurrentFrame('latitude', obj.getLatitude());
      addToCurrentFrame('height', obj.getHeight());
      addToCurrentFrame('XspeedX', obj.getXSpeed());
      addToCurrentFrame('Yspeed', obj.getYSpeed());
      addToCurrentFrame('Zspeed', obj.getZSpeed());
      addToCurrentFrame('pitch', obj.getPitch());
      addToCurrentFrame('roll', obj.getRoll());
      addToCurrentFrame('yaw', obj.getYaw());
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
