class ConsentRunView extends Backbone.View

  events:
    'click #non_consent_confirm' : 'noConsent'
    'click #consent_yes' : 'clearMessages'
    'click #consent_no' : 'showNonConsent'

  initialize: (options) ->
    @confirmedNonConsent = false
    @model  = @options.model
    @parent = @options.parent
  
  render: ->
    @$el.html "
    <form>
      <div class='question'>
        <label>#{@model.get('prompt') || 'Does the child consent?'}</label>
        <div class='messages'></div>
        <div class='non_consent_form confirmation'>
          <div>Click to confirm consent not obtained.</div>
          <button id='non_consent_confirm'>Confirm</button>
        </div>
        <div id='consent_options' class='buttonset'>
          <label for='consent_yes'>Yes, continue</label>
          <input id='consent_yes' type='radio' name='participant_consents' value='yes'>
          <label for='consent_no'>No, stop</label>
          <input id='consent_no' type='radio' name='participant_consents' value='no'>
        </div>
      </div>
    </form>
    "

    @trigger "rendered"
  
  isValid: ->
    if @confirmedNonConsent == false
      if @$el.find("input[name=participant_consents]:checked").val() == "yes"
        true
      else
        false
    else
      true

  showNonConsent: ->
    @$el.find(".non_consent_form").show(250)

  clearMessages: ->
    @$el.find(".non_consent_form").hide(250)
    @$el.find(".messages").html ""

  noConsent: ->
    @confirmedNonConsent = true
    @parent.abort()
    return false
  
  getSkipped: ->
    return "consent" : "skipped"
  
  showErrors: ->
    answer = @$el.find("input[name=participant_consents]:checked").val()
    if answer == "no"
      Utils.midAlert "Please confirm"
      @showNonConsent
    else if answer == undefined
      $(".messages").html "Please select one"

  getResult: ->
    return "consent" : @$el.find("input[name=participant_consents]:checked").val()
      
  getSum: ->
    return {
      correct: 1
      incorrect: 0
      missing: 0
      total: 1
    }