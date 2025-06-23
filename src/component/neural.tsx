import React from 'react';
import { Button } from '@mui/material';

interface NeuralState {
    neural: number[][];
}

export class Neural extends React.Component {
    state: NeuralState = {
        neural: [],
    };

    public get_neural(): number[] {
        return this.state.neural.map((layer) => layer.length);
    }

    render() {
        return (
            <div className={'neural-network'}>
                <div className={'layer-container'}>
                    {this.state.neural.map((layer, index) => (
                        <div key={index} className={'neural-container'}>
                            {layer.map((neuron, neuronIndex) => (
                                <span
                                    className={'neural'}
                                    key={neuronIndex}
                                ></span>
                            ))}
                            <Button
                                sx={{ color: '#fff' }}
                                onClick={() => {
                                    this.setState({
                                        neural: this.state.neural.map(
                                            (l, i) => {
                                                if (i === index) {
                                                    return [...l, 1];
                                                }
                                                return l;
                                            }
                                        ),
                                    });
                                }}
                            >
                                Add neuron
                            </Button>
                        </div>
                    ))}
                    <Button
                        sx={{ color: '#fff' }}
                        onClick={() => {
                            this.setState({
                                neural: [...this.state.neural, [1]],
                            });
                        }}
                    >
                        Add layer
                    </Button>
                </div>
            </div>
        );
    }
}
