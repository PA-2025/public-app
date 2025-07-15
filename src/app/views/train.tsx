import React from 'react';
import { ViewProps } from '@/src/app/types/train';
import {
    Button,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Select,
    Slider,
} from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { Neural } from '../../component/neural';

export default class View extends React.Component<ViewProps> {
    private neuralRef = React.createRef<Neural>();

    state = {
        selectedAlgo: 'mlp',
        selectedKernel: 'rbf',
    };

    render() {
        const {
            train_mlp,
            train_rbf,
            train_svm,
            resultsTraining,
            resultsFile,
            selectedGraph,
            setSelectedGraph,
            catDataset,
            setSelectedCatDataset,
            selectedCatDataset,
        } = this.props;

        const { selectedAlgo, selectedKernel } = this.state;

        return (
            <div className={'train-page'}>
                <div className={'train-buttons'}>
                    <FormControl
                        fullWidth
                        sx={{
                            background: '#2874a6',
                            borderRadius: '10px',
                            marginTop: '20px',
                            width: '30%',
                            margin: 'auto',
                        }}
                    >
                        <InputLabel id="select-label">Algo</InputLabel>
                        <Select
                            labelId="select-label"
                            id="simple-select"
                            value={selectedAlgo}
                            label="Algo"
                            onChange={(e) => this.setState({ selectedAlgo: e.target.value, selectedKernel: 'rbf' })}
                        >
                            <MenuItem value={'mlp'}>MLP</MenuItem>
                            <MenuItem value={'rbf'}>RBF</MenuItem>
                            <MenuItem value={'svm'}>SVM</MenuItem>
                        </Select>
                    </FormControl>

                    {selectedAlgo === 'mlp' && <Neural ref={this.neuralRef} />}

                    <Input
                        id="input-number"
                        sx={{
                            marginTop: '20px',
                            background: '#2874a6',
                            color: '#fff',
                            padding: '10px',
                        }}
                        type="number"
                        placeholder={
                            selectedAlgo === 'mlp'
                                ? 'nb_epochs'
                                : selectedAlgo === 'rbf'
                                    ? 'nb_clusters'
                                    : 'nb_epochs'
                        }
                    />

                    <div style={{ width: '30%', margin: 'auto', marginTop: '20px' }}>
                        <h3 style={{ textAlign: 'center', color: '#fff', marginBottom: '10px' }}>
                            {selectedAlgo === 'rbf' ? 'Gamma' : 'Learning rate'}
                        </h3>
                        <Slider
                            id="input-learning-rate"
                            defaultValue={0.01}
                            min={0.01}
                            max={0.1}
                            step={0.01}
                            valueLabelDisplay="on"
                            aria-label="Learning Rate"
                            sx={{
                                color: '#fff',
                                '& .MuiSlider-thumb': { color: '#fff' },
                                '& .MuiSlider-track': { color: '#fff' },
                                '& .MuiSlider-rail': { color: '#ccc' },
                            }}
                        />
                    </div>

                    {selectedAlgo === 'svm' && (
                        <>
                            <FormControl
                                fullWidth
                                sx={{
                                    background: '#2874a6',
                                    borderRadius: '10px',
                                    marginTop: '20px',
                                    width: '30%',
                                    margin: 'auto',
                                }}
                            >
                                <InputLabel id="kernel-label">Kernel</InputLabel>
                                <Select
                                    labelId="kernel-label"
                                    id="input-kernel"
                                    value={selectedKernel}
                                    label="Kernel"
                                    onChange={(e) => this.setState({ selectedKernel: e.target.value })}
                                >
                                    <MenuItem value={'rbf'}>RBF</MenuItem>
                                    <MenuItem value={'poly'}>Polynomial</MenuItem>
                                </Select>
                            </FormControl>
                            <Input
                                id="input-param"
                                type="number"
                                placeholder="param (γ ou degré)"
                                sx={{
                                    marginTop: '20px',
                                    background: '#2874a6',
                                    color: '#fff',
                                    padding: '10px',
                                }}
                            />
                            <Input
                                id="input-lambda"
                                type="number"
                                placeholder="lambda_svm"
                                sx={{
                                    marginTop: '20px',
                                    background: '#2874a6',
                                    color: '#fff',
                                    padding: '10px',
                                }}
                            />
                        </>
                    )}

                    <div className={'container-cat-dataset-filters'}>
                        {catDataset.map((cat) => (
                            <div
                                key={cat}
                                onClick={() => setSelectedCatDataset(cat)}
                                className={
                                    'cat-dataset-box' +
                                    (selectedCatDataset.includes(cat) ? ' active' : ' ')
                                }
                            >
                                {cat}
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="contained"
                        sx={{ background: '#2874a6', color: '#fff', marginTop: '20px' }}
                        onClick={() => {
                            const nb_epochs = parseInt((document.querySelector('#input-number') as HTMLInputElement)?.value || '0');
                            const learning_rate = parseFloat((document.querySelector('#input-learning-rate input') as HTMLInputElement)?.value || '0.01');

                            if (selectedAlgo === 'mlp') {
                                train_mlp(
                                    nb_epochs,
                                    this.neuralRef.current?.get_neural() || [],
                                    learning_rate,
                                    selectedCatDataset
                                );
                            } else if (selectedAlgo === 'rbf') {
                                train_rbf(
                                    learning_rate,
                                    nb_epochs,
                                    selectedCatDataset
                                );
                            } else if (selectedAlgo === 'svm') {
                                const param = parseFloat((document.querySelector('#input-param') as HTMLInputElement)?.value || '1');
                                const lambda_svm = parseFloat((document.querySelector('#input-lambda') as HTMLInputElement)?.value || '0.01');

                                train_svm(
                                    nb_epochs,
                                    param,
                                    learning_rate,
                                    selectedCatDataset,
                                    lambda_svm,
                                    selectedKernel
                                );
                            }
                        }}
                    >
                        Train
                    </Button>
                </div>

                <div className={'view_training_results'}>
                    <div className={'container-results'}>
                        {resultsTraining?.files.map((file, index) => (
                            <div key={index}>
                                <Button
                                    variant="contained"
                                    className={`button-result button-result${index}`}
                                    sx={{ background: '#2874a6', color: '#fff', marginTop: '20px' }}
                                    onClick={() => {
                                        setSelectedGraph(file);
                                        const btn = document.querySelector(`.button-result${index}`);
                                        btn?.classList.toggle('selected');
                                    }}
                                >
                                    {file}
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className={'container-charts'}>
                        <LineChart
                            title={'Training results'}
                            xAxis={[
                                {
                                    data: Array.from(
                                        { length: Math.max(...(resultsFile?.results.map(r => r.data.length) || [600])) },
                                        (_, i) => i + 1
                                    ),
                                },
                            ]}
                            series={
                                resultsFile?.results
                                    .filter((r) => selectedGraph.includes(r.name))
                                    .map((r) => ({ data: r.data })) || []
                            }
                            width={1000}
                            height={500}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
