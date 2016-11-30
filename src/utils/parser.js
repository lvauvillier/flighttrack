import DJIParser from 'dji-log-parser';

export default (flightLog, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    // init parser
    const parser = new DJIParser();

    // init frames
    const frames = [];
    let details;
    let flyTime = 0;

    // add property
    const addToCurrentFrame = (key, value) => {
      frames[flyTime] = frames[flyTime] ? frames[flyTime] : {};
      frames[flyTime][key] = value;
    };

    parser.on('DETAILS', (obj) => {
      details = {
        subStreet: obj.getSubStreet(),
        street: obj.getStreet(),
        city: obj.getCity(),
        area: obj.getArea(),
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
      flyTime = obj.getFlyTime() * 10;
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
