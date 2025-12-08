
import React from 'react'
import ReactDOM from 'react-dom'
import './App.less'
import {store} from './store'
import * as _store from './store'
import * as api from './api'
import {cls, isLocalServer, markdown} from '/utils'

import {Carousel, Modal, ButtonGroup, OverlayTrigger, Badge, Tooltip, Alert, Nav, Row, Col, Form, Button, InputGroup, FormControl, Tab, Accordion, Card, Spinner} from 'react-bootstrap'

_store.initStore()

function App(props) {

  _store.useAutoSave()

  _store.useWideScreenChange()

  let t=Date.now()
  React.useEffect(_=>{
    console.log('first render:', Date.now()-t)
  }, [])

  const idx=store.activeTabIdx.useValue()
  return <>
    <StatusBar />
    <Carousel {...{
      controls: false,
      touch: false,
      indicators: false,
      slide: true,
      interval: 300,
      activeIndex: idx,
    }}>
      <Carousel.Item>
        <ChatPanel />
      </Carousel.Item>
      <Carousel.Item>
        <SettingPanel />
      </Carousel.Item>
      <Carousel.Item>
        <HistoryPanel />
      </Carousel.Item>
    </Carousel>
    <Dialog />
  </>
}

function StatusBar(props) {
  const [activeTabIdx, set_activeTabIdx]=store.activeTabIdx.use()
  const historyCount=_store.useHistoryCount()
  const {about}=store

  const messages=store.messages.useValue()
  const {isResponsing}=messages

  return <div className='statusbar-box'>
    <Nav
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
          if(isResponsing) return;
          set_activeTabIdx(idx)
        }}>
          <Nav.Link disabled={isResponsing} eventKey={idx}>{txt}</Nav.Link>
        </Nav.Item>)
      }
    </Nav>
    {
      about && <i onClick={_=>{
        store.dialogData.setValue({
          show: true,
          title: 'About',
          large: true,
          content: <div className='about-content md-text' dangerouslySetInnerHTML={{__html: markdown(about)}} />,
        })
      }} className="about-btn btn btn-sm btn-secondary bi bi-question-lg" />
    }
  </div>
}

function confirmModal(title) {
  return new Promise(resolve=>{
    store.dialogData.setValue({
      show: true,
      title,
      onConfirm: resolve,
      cancelButton: true,
    })
  })
}

function Dialog() {
  const [dialogData, set_dialogData]=store.dialogData.use()
  const {onConfirm, title, show, content, cancelButton, large}=dialogData
  function closeDialog() {
    set_dialogData({
      ...dialogData,
      show: false,
    })
    onConfirm?.(false)
  }
  return <Modal show={show} onHide={closeDialog} size={large? "lg": "md"} className='modal-textarea'>
    <Modal.Header closeButton>
      {title && <Modal.Title>{title}</Modal.Title>}
    </Modal.Header>
    {
      content? <Modal.Body>{content}</Modal.Body>: null
    }
    {
      onConfirm?
        <div className='modal-footer'>
          <Button variant="primary" size="md" onClick={_=>{
            onConfirm(true)
            closeDialog()
          }}>
            OK
          </Button>{' '}
          {
            cancelButton?
              <Button variant="secondary" size="md" onClick={_=>{
                closeDialog()
              }}>
                Cancel
              </Button>:
              null
          }
        </div>:
        null
    }
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
      large: true,
      content: <Textarea value={value} onChange={onChange} />,
    })
  }}>{value}</div>
}

function SettingPanel(props) {
  const [apiKey, set_apiKey]=store.apiKey.use()
  const ApiKey=<Form.Group>
    <div className='apikey-config'>
      {
        isLocalServer()?
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
          />:
          <>
            Api key
            <a target='_blank' href='https://ollama.com/settings/keys'>
              <Badge className='apply-key' variant="primary">apply new key</Badge>
            </a>
          </>
      }
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
            _store.selectPrompt(e.target.value)
          }}
        >
          {
            customPrompt.list.map((t, idx)=>{
              return <option value={idx}>{t.title}</option>
            })
          }
        </Form.Control>
        <InputGroup.Prepend>
          <Button variant="danger" onClick={async _=>{
            if(await confirmModal('delete this prompt?')) {
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
      <OverlayTrigger overlay={<Tooltip id="tooltip-setting-btn">Load setting from github.</Tooltip>}>
        <Button className='btn-sm' variant="danger" onClick={async _=>{
          if(await confirmModal('Override settings?')) {
            _store.importDefaultSetting()
          }
        }}>Import default setting</Button>
      </OverlayTrigger>
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
  const {wideScreen}=store
  return <div className={cls('chat-panel', wideScreen.useValue() && 'wide-screen')}>
    <MsgBox />
    <InputArea />
  </div>
}

function HistoryPanel(props) {
  const history=store.messageHistory.useValue()
  const historyList=React.useMemo(_=>{
    return history.reduce((arr, h)=>arr.concat(h.messages), [])
  }, [history])
  const [showCount, LazyLoadComponent]=useLazyLoad({
    initDataLength: historyList.length,
  })
  return <div className='history-panel'>
    {
      historyList.length?
        <>
          <Alert className='clear-history' variant='danger'>
            <Button variant="danger" className="btn-sm" onClick={async _=>{
              if(await confirmModal('Delete all histories?')) {
                _store.deleteHistories()
              }
            }}>Delete all histories.</Button>
          </Alert>
          <div className='msgbox'>
            {
              historyList.map((msg, i)=>{
                return i>=showCount? null: <Wrapper key={msg.key} isBlur={_=>!_store.isHistoryPanelActive()}>
                  <Msg msg={msg} onDelete={async animation=>{
                    if(await confirmModal('Delete this message?')) {
                      await animation()
                      _store.deleteHistory(msg.key)
                    }
                  }} />
                </Wrapper>
              })
            }
            {LazyLoadComponent}
          </div>
        </>:
        <EmptyMessage />
    }
  </div>
}

function Wrapper({children, isBlur}) {
  const divRef=React.useRef(null)
  const [height, set_height]=React.useState(-1)
  const [show, set_show]=React.useState(true)
  return <ExposeComponent rootMargin='500px' onVisibleChange={isShow=>{
    if(!isShow) {
      set_height(divRef.current?.offsetHeight)
    }
    if(isBlur?.()) return;
    set_show(isShow)
  }}>
    <div ref={divRef} style={
      (show || height<0)? null: {width: 1, height}
    }>{show? children: null}</div>
  </ExposeComponent>
}
function ExposeComponent({onVisibleChange, rootMargin='1500px', children=null}) {
  const elementRef=React.useRef(null)
  React.useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          onVisibleChange(entry.isIntersecting)
        },
        {
          root: elementRef.current.parentNode,
          threshold: 0.1,
          rootMargin,
        }
      );
      observer.observe(elementRef.current);
      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      };
    }
  }, []);
  return <div ref={elementRef} style={children? null: {width: 1, height: 1, marginTop: -1, marginRight: -1}}>{children}</div>
}
function useLazyLoad({initCount=3, stepCount=3, initDataLength, rootMargin='1500px'}) {
  const [state, set_state]=React.useState({
    showAll: false,
    showCount: initCount,
    initDataLength,
  })

  return [
    state.showCount,
    state.showAll? null: <ExposeComponent
      key={state.showCount+'/'+state.initDataLength}
      rootMargin={rootMargin}
      onVisibleChange={isShow=>{
        if(!isShow) return;
        state.showCount+=stepCount
        if(state.showCount>=state.initDataLength) {
          state.showAll=true
        }
        set_state({...state})
      }}
    />,
  ]
}

function MsgBox(props) {
  const systemPrompt=_store.getPresetPrompt(false)
  const messages=store.messages.useValue()
  const {list, isResponsing}=messages
  const boxRef=React.useRef(null)

  const [showCount, LazyLoadComponent]=useLazyLoad({
    initDataLength: list.length,
  })

  const [hideInput, set_hideInput]=store.hideInput.use()

  function scroll() {
    boxRef.current.scrollTo(0, 9e9)
  }

  React.useEffect(_=>{
    if(list[list.length-1]?.isPending) {
      scroll()
    }
  }, [isResponsing, list[list.length-1]?.text, list[list.length-1]?.thinking])

  React.useEffect(_=>{
    scroll()
  }, [])

  const lastScrollp=React.useRef(0)
  const [customPrompt, set_customPrompt]=store.customPrompt.use()
  return <div className='chat-messages'>
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
                _store.selectPrompt(e.target.value)
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
      {LazyLoadComponent}
      {
        list.length?
          <>
          {list.map((msg, i)=>(i+showCount>=list.length)? <Wrapper isBlur={_=>!_store.isChatPanelActive()}><Msg
            msg={msg}
            onReload={async _=>{
              if(await confirmModal('Reload answer?')) {
                _store.reloadAnswer(i)
              }
            }}
            onDelete={async animation=>{
              if(await confirmModal('Delete this message?')) {
                await animation()
                _store.deleteMessage(i)
              }
            }}
          /></Wrapper>: null)}
          <center className='function-btns'>
            <OverlayTrigger overlay={<Tooltip id="tooltip-newchat">Start a new chat</Tooltip>}>
              <span className="d-inline-block">
                <Button variant='warning' disabled={
                  isResponsing || !list.length
                } className='btn-sm' onClick={_=>{
                  _store.newChat()
                }}>
                  <i className="new-ico bi bi-arrow-return-left"></i>
                  New chat
                </Button>
              </span>
            </OverlayTrigger>
            <OverlayTrigger overlay={<Tooltip id="tooltip-newchat">{hideInput? 'Show': 'Hide'} input box</Tooltip>}>
              <span className="d-inline-block">
                <Button variant='primary' disabled={
                  isResponsing || !list.length
                } className='btn-sm' onClick={_=>{
                  set_hideInput(!hideInput)
                }}>
                  <i className={cls("new-ico bi", hideInput? "bi-arrows-fullscreen": "bi-arrows-angle-contract")}></i>
                  {hideInput? 'Show': 'Hide'} input box
                </Button>
              </span>
            </OverlayTrigger>
          </center>
          </>:
          <EmptyMessage />
      }
    </div>
  </div>

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

  const divRef=React.useRef(null)
  const [plain, set_plain]=React.useState(false)
  return <div key={key} ref={divRef} class={cls(
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
              onDelete && <Button variant="danger" className='btn-sm' onClick={_=>{
                onDelete(async _=>{
                  divRef.current.className+=' pre-out'
                  await new Promise(resolve=>{
                    setTimeout(resolve, 400)
                  })
                })
              }}>
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
  const wideScreen=store.wideScreen.useValue()
  const inputRef=React.useRef(null)

  const model=store.model.useValue()

  const [sendWithHistory, set_sendWithHistory]=store.sendWithHistory.use()
  const [enterSend, set_enterSend]=store.enterSend.use()
  const [multiLineInput, set_multiLineInput]=store.multiLineInput.use()

  const [hideInput, set_hideInput]=store.hideInput.use()

  const showAsMultiLine=wideScreen || multiLineInput

  React.useEffect(_=>{
    if(!messages.list.length || messages.isResponsing) set_hideInput(false)
  }, [messages])

  React.useEffect(_=>{
    const [evt, fn]=['keydown', e=>{
      if(!e.shiftKey || !messages.list.length || messages.isResponsing) return;
      if([e.code, e.key].includes("Escape") || e.keyCode===27) {
        set_hideInput(!store.hideInput.getValue())
      }
    }]
    window.addEventListener(evt, fn)
    return _=>window.removeEventListener(evt, fn)
  }, [])

  React.useEffect(_=>{
    if(messages.isResponsing) return;
    api.saveMessages()
    if(!showAsMultiLine) inputRef.current.focus()
  }, [messages.isResponsing])

  function send() {
    const v=inputValue.trim()
    if(!v) return false
    set_inputValue('')
    _store.ask(v)
    return true
  }

  return <InputGroup className={cls('input-area', hideInput && 'hide')}>
    <FormControl
      ref={target=>{
        inputRef.current=target
      }}
      readOnly={model.isError}
      placeholder="Ask me anything.."
      as={showAsMultiLine? "textarea": "input"}
      className={active || inputValue? 'active': ''}
      value={inputValue}
      onMouseMove={e=>{
        if(wideScreen) inputRef.current.focus()
      }}
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
    <ButtonGroup>
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
      {
        wideScreen?
          null:
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
      }
    </ButtonGroup>
    {(_=>{
      if(model.isError) {
        return <div className='stop-btn' onClick={_=>{
          if(!isLocalServer()) {
            store.activeTabIdx.setValue(1)
          }
        }}>
          <Button variant="warning" onClick={_=>{
            _store.loadModels()
          }}>
            <i class="icon bi bi-emoji-dizzy-fill"></i>
            No available model.
            {isLocalServer()? null: <div>Go to [Setting], and apply an api key.</div>}
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
