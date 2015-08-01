# input-previews
An angular directive for typing out previews of what can go in an input field. Multiple inputs are supported.

## Description
This directive allows you to type out previews for inputs so that users of your site can see an interactive example of the content that should be added to their inputs. 

## DEMO
youknowyoure.com

##Examples
Say you have an input called "Fruits". You might want to show people what types of fruits they can type into it. So you would use this directive to show fruits actively being typed into the input. You could show "Apples" and then "Oranges" and then "Grapes". The experience is intuitive since it looks like someone is typing in those values.

## Notes
This is not pure AngularJS. I use setTimeout instead of $timeout because I don't think it's necessary to trigger a $digest for the text changes. I also don't use the actual model of the input. If someone wants to do it using the model, I'd be happy to merge that pull request.

## Usage
Add input-preview to an element (I choose the form element on my site). The value of input-preview is an array of objects matching the following format:

```
  [
    {
      selector: '#my-el',
      wordsAndTimes:[
                      {
                        word:'my preview',
                        time:500 //ms
                      }
                    ]
    }
  ]
```
This would select the input with id = "my-el" and type into it the words "My preview" over the course of 500ms.

If you want to have multiple previews, you can add more objects to the array like so:
```
[
    {
      selector: '#my-el',
      wordsAndTimes:[
                      {
                        word:'my preview 1',
                        time:500 //ms
                      },
                      {
                        word:'my preview 2',
                        time:500 //ms
                      }
                    ]
    }
  ]
```
This would type out 'my preview 1' and then type out 'my preview 2' in the 'my-el' input.

If you would like to type into multiple inputs you just add multiple objects to the array of input-preview elements like so:
```
[
    {
      selector: '#my-el-1',
      wordsAndTimes:[
                      {
                        word:'my el-1 preview 1',
                        time:500 //ms
                      },
                      {
                        word:'my el-1 preview 2',
                        time:500 //ms
                      }
                    ]
    },
    {
      selector: '#my-el-2',
      wordsAndTimes:[
                      {
                        word:'my el-2 preview 1',
                        time:500 //ms
                      },
                      {
                        word:'my el-2 preview 2',
                        time:500 //ms
                      }
                    ]
    }
  ]
```
This functions slightly differently. The first wordsAndTimes object from my-el-1 runs and types 'my el-1 preview 1' into the my-el-1 input. Then the wordsAndTimes object from my-el-2 is run and 'my el-2 preview 1' is typed into the my-el-2 input. Once both my-el-1 and my-el-2 have values typed into them, both inputs are cleared and the second objects from wordsAndTimes are run.

The delay between when the words finish typing and when they are cleared can be set using the input-group-delay attribute. By default the time is 750ms.

##Attributes

### input-group-delay = 'timeInMs' (default: 750)
When you want to have multiple previews typed into your inputs, you use the input group delay to define how much time the old value should show before we start typing the new value.

From the fruits example, once we finishing typing "Apples" we want the user to be able to read the finished word before typing "Grapes". This attribute sets how long they have to read before the new value starts typing.

### clear-on-focus (default: false)
If you want the input previews to stop and empty their values when the user focuses on an input field, set clear-on-focus="true".

##Todo
Make this directive work by attaching it to individual inputs rather than defining selectors in the initial object. Have an option to tie multiple instances of the directive together to behave the way they do now when there are multiple selectors.
