import DJIParser from 'dji-log-parser';

export default (flightLog, callback) => {
  const reader = new FileReader();
  reader.onload = () => {
    // init parser
    const parser = new DJIParser();

    // init frames
    const frames = [];
    let flyTime = 0;

    // add property
    const addToCurrentFrame = (key, value) => {
      frames[flyTime] = frames[flyTime] ? frames[flyTime] : {};
      frames[flyTime][key] = value;
    };

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
      frames,
    });
  };
  reader.readAsArrayBuffer(flightLog);
};
