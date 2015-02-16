let var = macro {
  case {_ $name:ident = ($($param:ident : $ptype:ident) (,) ...): $rtype:ident => $body:expr} => {
    var ps = #{$param ...};
    var ts = #{$ptype ...};
    var pts = '';
    for (var i = 0; i < ps.length; i++) {
      pts += unwrapSyntax(ps[i]) + ': ' + unwrapSyntax(ts[i]) + ', ';  
    }
    var pts_ = pts.slice(0, -2);
    var x = #{ var $name = function ($param (,) ...) { $body } };
    x[0].token.leadingComments = [{
      type: "Block",
      value: ': (' + pts_ + '): ' + unwrapSyntax(#{$rtype})
    }];
    return x;
  }
  case {_ $rest ... } => { return #{ var $rest ... } }
}

var plus = (a : number, b: number): number => a + b;

var x = 1;

// https://github.com/jareware/flotate
// https://github.com/jlongster/es6-macros
