from django import template

register = template.Library()


@register.filter
def time_view(miliseconds):
    seconds = miliseconds // 1000
    hours = seconds // 3600
    minutes = str((seconds % 3600) // 60)
    seconds = str(seconds % 60)
    if hours:
        time_string = str(hours) + ':' + minutes.rjust(2, '0') + ':'
    else:
        time_string = minutes + ':'
    time_string += seconds.rjust(2, '0')

    return time_string


@register.filter
def time_view_seconds(seconds):
    hours = seconds // 3600
    minutes = str((seconds % 3600) // 60)
    seconds = str(seconds % 60)
    if hours:
        time_string = str(hours) + ':' + minutes.rjust(2, '0') + ':'
    else:
        time_string = minutes + ':'
    time_string += seconds.rjust(2, '0')

    return time_string
