import React from 'react';
import { ViewProps } from '../types/home';
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default class View extends React.Component<ViewProps> {
    render() {
        const { test_all, result } = this.props;

        return (
            <div className={'home-page'}>
                <audio
                    src={process.env.PUBLIC_URL + 'test.mp3'}
                    controls
                    style={{ display: 'none' }}
                ></audio>

                <div className={'pop-up'}>
                    <div
                        className={'close-pop-up'}
                        onClick={() => {
                            document
                                .querySelector('.pop-up')
                                ?.classList.remove('active');
                        }}
                    >
                        <span className={'close'}>&times;</span>
                    </div>
                    <h2>
                        Your muse is{' '}
                        <span>
                            {result != undefined ? result.prediction : ''}
                        </span>
                    </h2>
                </div>

                <div className={'banner-title'}>
                    <h3>Identify songs from your browser</h3>
                </div>
                <div className={'landing-page'}>
                    <div className={'wrapper-left'}>
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload song
                            <input
                                type="file"
                                accept="audio/*"
                                hidden
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) {
                                        return;
                                    }
                                }}
                            />
                        </Button>

                        <br></br>

                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload your model (optional)
                            <input
                                id="weight_file"
                                type="file"
                                hidden
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) {
                                        return;
                                    }
                                }}
                            />
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                background: '#fff',
                                color: '#08f',
                                marginTop: '20px',
                                padding: '10px 20px',
                            }}
                            onClick={() => {
                                test_all().then((r) => console.log(r));
                            }}
                        >
                            Apply
                        </Button>
                    </div>

                    <div className={'wrapper-right'}>
                        <img src={process.env.PUBLIC_URL + 'logo.png'} alt="" />
                        <h1>Find the genre of your song</h1>
                        <Button
                            variant="contained"
                            sx={{
                                background: '#fff',
                                color: '#08f',
                                marginTop: '20px',
                            }}
                            onClick={() => (document.location = '/train')}
                        >
                            Train your model
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}
