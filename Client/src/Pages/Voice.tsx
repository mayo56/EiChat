import React, { LegacyRef } from 'react';

const Voice = () => {
    //pas touché
    const [devices, setDevices] = React.useState<MediaDeviceInfo[] | null>(null);
    const ListeDevices = async () => {
        const jeSaisPas = await navigator.mediaDevices.enumerateDevices();
        setDevices(jeSaisPas);
    }


    const localVideoRef = React.useRef<HTMLVideoElement | null>(null)

    //liste des média actifs
    // 1. Video
    // 2. Audio
    // [{Video}, {Audio}]
    const [AllMedia, setAllMedia] = React.useState<MediaDeviceInfo[] | null>(null)

    const [VideoDevices, setVideoDevices] = React.useState<MediaDeviceInfo[] | null>(null)
    const [AudioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[] | null>(null)


    React.useEffect(() => {
        return () => {
            navigator.mediaDevices.enumerateDevices().then(res => {
                //Liste des media vidéo
                const devicesVideoList = res.filter(e => e.kind === "videoinput")
                setVideoDevices(devicesVideoList)

                //liste des medias audio (input)
                const devicesAudioList = res.filter(e => e.kind === "audioinput")
                setAudioDevices(devicesAudioList)

                //on met les media dans la variable
                setAllMedia(() => [devicesVideoList[0], devicesAudioList[0]]);

                //on lance les media (par défauts)
                navigator.mediaDevices.getUserMedia({
                    video: {
                        deviceId: devicesVideoList[0].deviceId,
                        width: 1280
                    },
                    audio: {
                        deviceId: devicesAudioList[0].deviceId
                    }
                }).then(stream => {
                    localVideoRef.current!.srcObject = stream;
                })
            })
            ListeDevices()
        };
    }, []);

    /**
     * Permet de changer la vidéo retournée
     */
    const camChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const device = VideoDevices?.find(d => d.label === e.target.value)
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                deviceId: { exact: device?.deviceId }
            },
            audio: {
                deviceId: { exact: AllMedia![1].deviceId }
            }
        }).then(res => {
            localVideoRef.current!.srcObject = res;
            setAllMedia(() => [device!, AllMedia![1]])
        });
    };

    /**
     * Permet de changer l'audio retourné
     */
    const audioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const device = AudioDevices?.find(d => d.label === e.target.value)
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1280,
                deviceId: { exact: AllMedia![0].deviceId }
            },
            audio: {
                deviceId: { exact: device?.deviceId }
            }
        }).then(res => {
            localVideoRef.current!.srcObject = res;
            setAllMedia(() => [AllMedia![0], device!])
        });
    }


    return (
        <div>
            <video ref={localVideoRef} autoPlay playsInline controls />
            <br />
            <h3>Audio (Entrée)</h3>
            <select name='audio' onChange={audioChange}>
                {
                    devices?.map(e => {
                        if (e.kind === "audioinput") {
                            return (
                                <option>{e.label}</option>
                            )
                        }
                    })
                }
            </select>

            <h3>Video</h3>
            <select name='audio' onChange={e => camChange(e)}>
                {
                    devices?.map(e => {
                        if (e.kind === "videoinput") {
                            return (
                                <option>{e.label}</option>
                            )
                        }
                    })
                }
            </select>
        </div>
    );
};

export default Voice;