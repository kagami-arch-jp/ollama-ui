
import React from 'react'
import ReactDOM from 'react-dom'
import './App.less'
import {store} from './store'
import * as _store from './store'
import * as api from './api'
import {cls} from '/utils'

import {Modal, ButtonGroup, OverlayTrigger, Badge, Tooltip, Alert, Nav, Row, Col, Form, Button, InputGroup, FormControl, Tab, Accordion, Card, Spinner} from 'react-bootstrap'

_store.initStore()

function App(props) {

  _store.useAutoSave()

  return <>
    <StatusBar />
    {
      [
        <ChatPanel />,
        <SettingPanel />,
        <HistoryPanel />,
      ][store.activeTabIdx.useValue()]
    }
    <Dialog />
  </>
}

function StatusBar(props) {
  const [activeTabIdx, set_activeTabIdx]=store.activeTabIdx.use()
  const historyCount=_store.useHistoryCount()
  return <Nav
    className='statusbar'
    variant="tabs"
    defaultActiveKey={activeTabIdx}
  >
    {
      [
        <><i class="bi bi-person-workspace"></i>Chat</>,
        <><i class="bi bi-gear-fill"></i>Setting</>,
        <>
          <i class="bi bi-clipboard2-fill"></i>History
          {
            historyCount>0 && <Badge variant="info" className='history-count'>{historyCount}</Badge>
          }
        </>,
      ].map((txt, idx)=><Nav.Item key={idx} onClick={_=>{
        set_activeTabIdx(idx)
      }}>
        <Nav.Link eventKey={idx}>{txt}</Nav.Link>
      </Nav.Item>)
    }
  </Nav>
}


function Dialog() {
  const [dialogData, set_dialogData]=store.dialogData.use()
  function closeDialog() {
    set_dialogData({
      ...dialogData,
      show: false,
    })
  }
  return <Modal show={dialogData.show} onHide={closeDialog} size="lg" className='modal-textarea'>
    <Modal.Header closeButton>
      <Modal.Title>{dialogData.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{dialogData.content}</Modal.Body>
  </Modal>
}

function Summary({placeHolder, title, value, onChange}) {
  const Textarea=(props)=>{
    const [value, set_value]=React.useState(props.value)
    return <Form.Control
      value={value}
      onChange={e=>{
        const v=e.target.value
        set_value(v)
        props.onChange(v)
      }}
      as="textarea"
      rows={6}
      placeHolder={props.placeHolder}
    />
  }
  return <div className='summary' onClick={_=>{
    store.dialogData.setValue({
      show: true,
      title,
      content: <Textarea value={value} onChange={onChange} />,
    })
  }}>{value}</div>
}

function SettingPanel(props) {
  const [apiKey, set_apiKey]=store.apiKey.use()
  const ApiKey=<Form.Group>
    <div className='apikey-config'>
      <Form.Check
        className='checker'
        type="switch"
        id="apiKey-switch"
        label="Use online api"
        checked={apiKey.enable}
        onChange={e=>{
          set_apiKey({
            ...apiKey,
            enable: e.target.checked,
          })
        }}
      />
    </div>
    <Form.Control
      value={apiKey.value}
      onChange={e=>set_apiKey({
        ...apiKey,
        value: e.target.value,
      })}
      className={cls('custom-input', apiKey.enable? '': 'hide')}
      as="input"
      placeHolder='apiKey'
    />
  </Form.Group>

  const [prompt, set_prompt]=store.prompt.use()
  const SystemPrompt=<Form.Group>
    <Form.Label>
      <Form.Check
        type="switch"
        id="system-prompt-switch"
        label="Use System prompt"
        checked={prompt.enable}
        onChange={e=>{
          set_prompt({
            ...prompt,
            enable: e.target.checked,
          })
        }}
      />
    </Form.Label>
    <Form.Group className={cls('custom-input', prompt.enable? '': 'hide')}>
      <Summary
        placeHolder={'System prompt'}
        title={'System prompt'}
        value={prompt.value}
        onChange={v=>{
          set_prompt({
            ...prompt,
            value: v,
          })
        }}
      />
    </Form.Group>
  </Form.Group>

  const [contextLength, set_contextLength]=store.contextLength.use()
  const ContextLength=<Form.Group controlId="contextLengthRange">
    <Form.Label className='range-input'>
      Context length: {Math.round(contextLength/1024)}k
      <Form.Control
        type="range"
        custom
        value={Math.round(contextLength/1024)}
        min={8}
        step={4}
        max={128}
        onChange={e=>{
          set_contextLength(Math.round(e.target.value*1024))
        }}
      />
    </Form.Label>
  </Form.Group>

  const [temperature, set_temperature]=store.temperature.use()
  const Temperature=<Form.Group controlId="temperatureRange">
    <Form.Label className='range-input'>
      Temperature: {temperature}
      <Form.Control
        type="range"
        custom
        value={temperature}
        min={0}
        step={.1}
        max={2}
        onChange={e=>{
          set_temperature(e.target.value)
        }}
      />
    </Form.Label>
  </Form.Group>

  const [model, set_model]=store.model.use()
  const Model=<Form.Group controlId="model">
    <Form.Label>Select model</Form.Label>
    {
      model.isLoading?
        <Button variant="light" className='loading-model btn-sm' disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>:
        <Form.Control
          as="select"
          custom
          value={model.idx}
          disabled={model.isError}
          onChange={e=>{
            _store.selectModel(e.target.value)
          }}
        >
          {model.names.length?
            model.names.map((name, idx)=>{
              return <option value={idx}>{name}</option>
            }):
            <option>- No model -</option>
          }
        </Form.Control>
    }
  </Form.Group>

  const [customPrompt, set_customPrompt]=store.customPrompt.use()
  const CustomPrompt=<Form.Group>
    <Form.Label>
      <Form.Check
        type="switch"
        id="custom-switch-1"
        label="Use preset prompt"
        checked={customPrompt.enable}
        onChange={e=>{
          set_customPrompt({
            ...customPrompt,
            enable: e.target.checked,
          })
        }}
      />
    </Form.Label>
    <Form.Group className={cls('custom-input', customPrompt.enable? '': 'hide')}>
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button variant="primary" onClick={_=>{
            customPrompt.list.unshift({title: 'Untitled', content: ''})
            customPrompt.idx=0
            set_customPrompt({
              ...customPrompt
            })
          }}>New Prompt</Button>
        </InputGroup.Prepend>
        <Form.Control
          as="select"
          custom
          value={customPrompt.idx}
          onChange={e=>{
            customPrompt.idx=e.target.value
            set_customPrompt({
              ...customPrompt
            })
          }}
        >
          {
            customPrompt.list.map((t, idx)=>{
              return <option value={idx}>{t.title}</option>
            })
          }
        </Form.Control>
        <InputGroup.Prepend>
          <Button variant="danger" onClick={_=>{
            if(confirm('delete this prompt?')) {
              customPrompt.list.splice(customPrompt.idx, 1)
              customPrompt.idx=customPrompt.list.length-1
              set_customPrompt({...customPrompt})
            }
          }}
          disabled={customPrompt.list.length<2}
          >Delete</Button>
        </InputGroup.Prepend>
      </InputGroup>

      <Summary
        placeHolder={"<Title>\nPrompt content.."}
        title={'Custom prompt'}
        value={(t=>{
          return t? t.raw: ''
        })(customPrompt.list[customPrompt.idx])}
        onChange={value=>{
          const [, title, content]=value.match(/^\s*<(.*?)>\s*([\S\s]*)|$/)
          const r=customPrompt.list[customPrompt.idx]
          r.title=title || 'Untitled'
          r.content=content || (title? '': value)
          r.raw=value
          set_customPrompt({
            ...customPrompt
          })
        }}
      />

    </Form.Group>
  </Form.Group>

  React.useEffect(_=>{
    if(_store.getApikey(true)===model.byApikey) return;
    _store.loadModels()
  }, [apiKey])

  return <Form className='main-content-bs setting-form'>
    {ApiKey}
    {Model}
    {SystemPrompt}
    {CustomPrompt}
    {ContextLength}
    {Temperature}
    <div className='btns'>
      <Button className='btn-sm' variant="primary" onClick={_=>{
        _store.exportSetting()
      }}>Export setting</Button>
      <Button className='btn-sm' variant="info" onClick={_=>{
        _store.importSetting()
      }}>Import setting</Button>
    </div>
  </Form>
}

function EmptyMessage(props) {
  return <h2 className='empty-panel'>
    <i className="bi bi-emoji-expressionless-fill"></i>
    No message.
  </h2>
}

function ChatPanel(props) {
  return <div className='chat-panel'>
    <MsgBox />
    <InputArea />
  </div>
}

function HistoryPanel(props) {
  const history=store.messageHistory.useValue()
  return <div className='history-panel'>
    {
      history.length?
        <>
          <Alert className='clear-history' variant='danger'>
            <Button variant="danger" className="btn-sm" onClick={_=>{
              if(confirm('Delete all histories?')) {
                _store.deleteHistories()
              }
            }}>Delete all histories.</Button>
          </Alert>
          {history.map(h=>{
            return <div className='msgbox' key={h.messages[0].key}>
              {h.messages.map((msg, i)=><Msg msg={msg} onDelete={_=>{
                if(confirm('Delete this message?')) {
                  _store.deleteHistory(i, h)
                }
              }} />)}
            </div>
          })}
        </>:
        <EmptyMessage />
    }
  </div>
}

function MsgBox(props) {
  const systemPrompt=_store.getPresetPrompt(false)
  const messages=store.messages.useValue()
  const {list, isResponsing}=messages
  const boxRef=React.useRef(null)

  React.useEffect(_=>{
    if(list[list.length-1]?.isPending) {
      boxRef.current.scrollTo(0, 9e9)
    }
  }, [isResponsing, list[list.length-1]?.text, list[list.length-1]?.thinking])

  React.useEffect(_=>{
    boxRef.current.scrollTo(0, 9e9)
  }, [])

  const lastScrollp=React.useRef(0)
  const [customPrompt, set_customPrompt]=store.customPrompt.use()
  return <>
    {
      systemPrompt && <Accordion className='preset-card'>
        <Card>
          <Card.Header>
          <ButtonGroup aria-label="Basic example">
            <Accordion.Toggle className='preset-prompt-btn btn-sm' as={Button} eventKey="preset-prompt">
              <i className="bi bi-info-circle-fill"></i>
              Prompt
            </Accordion.Toggle>
            <Form.Control
              as="select"
              size='sm'
              custom
              className='btn'
              value={customPrompt.enable? customPrompt.idx: -1}
              onChange={e=>{
                const idx=e.target.value
                if(idx<0) {
                  customPrompt.enable=false
                }else{
                  customPrompt.idx=idx
                  customPrompt.enable=true
                }
                set_customPrompt({
                  ...customPrompt
                })
              }}
            >
              <option value={-1}>- Disabled -</option>
              {
                customPrompt.list.map((t, idx)=>{
                  return <option value={idx}>{t.title}</option>
                })
              }
            </Form.Control>
            </ButtonGroup>
          </Card.Header>
          <Accordion.Collapse eventKey="preset-prompt">
            <Alert variant='info' className='preset-prompt'>
              <pre>{systemPrompt}</pre>
            </Alert>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    }
    <div className='msgbox' ref={target=>{
      boxRef.current=target
    }}>
      {
        list.length?
          list.map((msg, i)=><Msg
            msg={msg}
            onReload={_=>{
              if(confirm('Reload answer?')) {
                _store.reloadAnswer(i)
              }
            }}
            onDelete={_=>{
              if(confirm('Delete this message?')) {
                _store.deleteMessage(i)
              }
            }}
          />):
          <EmptyMessage />
      }
      {
        isResponsing || !list.length?
          null:
          <center>
            <OverlayTrigger overlay={<Tooltip id="tooltip-newchat">Start a new chat</Tooltip>}>
              <span className="d-inline-block">
                <Button variant='success' className='btn-sm' onClick={_=>{
                  _store.newChat()
                }}>
                  <i className="new-ico bi bi-arrow-return-left"></i>
                  New chat
                </Button>
              </span>
            </OverlayTrigger>
          </center>
      }
    </div>
  </>

}

function Msg(props) {
  const {
    onReload,
    onDelete,
    msg,
  }=props
  const {
    key,
    isQuestion,
    text,
    thinking,
    html,

    time,
    user,
    model,

    isActive,

    isPending,
    isError,
  }=msg

  const [plain, set_plain]=React.useState(false)
  return <div key={key} class={cls(
    'text',
    isQuestion? 'question': 'answer',
    isActive && 'active',
  )}>
    <div className='info'>
      <div className='user'>
        <i className={cls('icon', 'bi', isQuestion? 'bi-person-circle': 'bi-emoji-smile')} />
        <div className='li'>
          <div className='name'>
            {user || model}
          </div>
          <div className='time'>{time}</div>
        </div>
      </div>
      <div className='tool-btns'>
        {
          isQuestion? null: <Form.Check
            type="switch"
            id={"answer-source-"+key}
            label="Show source"
            className='btn-sm'
            checked={plain}
            onChange={e=>{
              set_plain(e.target.checked)
            }}
          />
        }
        {
          isPending? null: <>
            {
              isQuestion? null: (onReload && <Button variant="info" className='btn-sm' onClick={onReload}>
                <i className="bi bi-arrow-clockwise"></i>
              </Button>)
            }
            {
              onDelete && <Button variant="danger" className='btn-sm' onClick={onDelete}>
                <i className="bi bi-x-lg"></i>
              </Button>
            }
          </>
        }
      </div>
    </div>
    <div className='message'>
      {
        (text || thinking)? (
          isQuestion?
            <pre className='user-input'>{text}</pre>:
            (
              plain || !html?
                <div className='md-text plain'>
                  {thinking && `<think>\n${thinking}\n</think>`}
                  {text}
                </div>:
                <div className='md-text' dangerouslySetInnerHTML={{
                  __html: html,
                }} />
            )
          ):
          <Spinner style={{margin: 10}} size='sm' animation="border" />
      }
    </div>
  </div>
}

function InputArea(props) {
  const [inputValue, set_inputValue]=store.inputValue.use()
  const [active, set_active]=React.useState(false)
  const messages=store.messages.useValue()
  const inputRef=React.useRef(null)

  const model=store.model.useValue()

  const [sendWithHistory, set_sendWithHistory]=store.sendWithHistory.use()
  const [enterSend, set_enterSend]=store.enterSend.use()
  const [multiLineInput, set_multiLineInput]=store.multiLineInput.use()

  React.useEffect(_=>{
    if(messages.isResponsing) return;
    api.saveMessages()
    if(!multiLineInput) inputRef.current.focus()
  }, [messages.isResponsing])

  function send() {
    const v=inputValue.trim()
    if(!v) return false
    set_inputValue('')
    _store.ask(v)
    return true
  }

  return <InputGroup className='input-area'>
    <FormControl
      ref={target=>{
        inputRef.current=target
      }}
      placeholder="Ask me anything.."
      as={multiLineInput? "textarea": "input"}
      className={active || inputValue? 'active': ''}
      value={inputValue}
      onChange={e=>{
        set_inputValue(e.target.value)
      }}
      onFocus={_=>{
        set_active(true)
      }}
      onBlur={_=>{
        set_active(false)
      }}
      onKeyPress={e=>{
        if(!enterSend) return;
        if((e.charCode==13 || e.code==='Enter') && !e.shiftKey) {
          if(!send()) return;
          set_active(false)
          inputRef.current?.blur()
        }
      }}
      onMouseOver={_=>{
        if(!multiLineInput) inputRef.current.focus()
      }}
    />
    <InputGroup.Append>
      <Button variant="success" onClick={send}>Send</Button>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip>
            {sendWithHistory?
              'Send message with history.':
              'Send message without history.'
            }
          </Tooltip>
        }
      >
        <Button variant={sendWithHistory? "danger": "secondary"} onClick={_=>{
          set_sendWithHistory(!sendWithHistory)
        }}>
          <i className={cls('bi', sendWithHistory? 'bi-clock-fill': 'bi-clock-history')}></i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip>
            {enterSend?
              'Send message when enter pressed.':
              'Send message after click send button'
            }
          </Tooltip>
        }
      >
        <Button variant={enterSend? "primary": "secondary"} className='enter-switch' onClick={_=>{
          set_enterSend(!enterSend)
        }}>
          <i className={cls('bi', enterSend? 'bi-sign-turn-right': 'bi-sign-no-right-turn-fill')}></i>
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        placement='top'
        overlay={
          <Tooltip>
            {multiLineInput? 'Multiline inputbox.': 'Singleline inputbox.'}
          </Tooltip>
        }
      >
        <Button variant={multiLineInput? "info": "secondary"} onClick={_=>{
          set_multiLineInput(!multiLineInput)
        }}>
          <i className={cls('bi', multiLineInput? 'bi-list': 'bi-dash')}></i>
        </Button>
      </OverlayTrigger>
    </InputGroup.Append>
    {(_=>{
      if(model.isError) {
        return <div className='stop-btn'>
          <Button variant="warning" onClick={_=>{
            _store.loadModels()
          }}>
            <i class="icon bi bi-emoji-dizzy-fill"></i>
            No available model.
          </Button>
        </div>
      }
      if(messages.isResponsing) {
        return <div className='stop-btn'>
          <Button variant="primary" onClick={_=>{
            api.resetOllamaClient()
          }}>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
              className="icon"
            />
            Click to stop responsing...
          </Button>
        </div>
      }
    })() || null}
  </InputGroup>

}

ReactDOM.render(<App />, document.getElementById('app'))
