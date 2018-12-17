# souruly.github.io : Giraffe Evolution

## Notes : 

#### About the solution : 
The simulation gives us an 'optimal soultion' for the given problem.
**"Fitness Function : Design Approach 2"** deals with 'What is optimal for this case?' and 'How is it calculated?'.

#### Fitness Function:
###### Design Approach 1 : 
  While designing the fitness function, the easiest and the most straight fowward approach would be to maximize the height.
  This stems form the fact that in a given giraffe population, the onw which is slightly taller that the others has to face least competition for food and hence is fitter('fitness' in the sense of evolution characteristics).
  The the fitness function looks something like
  >Fitness = Giraffe.neckLength      
  >//Higher is better
  
###### Design Approach 2 : 
But to think of it, Approach  1 has a fatal flaw. If the case were that the fitness of a given Giraffe increass linearly with a increase in NeckLength, then giraffes would continue to grow taller indefinitely.
But that isn't the case. The growth is bound by the factors like
1. The availability of food decreases with height above a certain threshhold.
2. My personal favourite [The Square Cube Law](https://en.wikipedia.org/wiki/Square%E2%80%93cube_law) ("Biomechanics" section).
So we can achieve the desired result be selecting a threshold

>let threshold = 270;

Then we try to design a graph, preferably parabolic, which has a maxima at NeckLength = 270.

> y = (w1)*(x)-(w2)*(x^2)
> Here y = Fitness, x = NeckLength, w1,w2 = Biases    

Therefore, by calculus, maxima at threshold :
> x = w1/(2*w2)

Find appropriate values for w1,w2 and get value for y
> let w1 = 5400, w2 = 10;
> let x = threshold
> let OptimimFitness = (w1)*(x)-(w2)*(x^2);

Google gives direct results for the [graph plot](https://www.google.co.in/search?dcr=0&q=graph+of+5400*x-10*x%5E2&oq=graph&gs_l=psy-ab.3.0.35i39k1l2j0i67k1l7j0i131k1.1285895.1287516.0.1289362.5.5.0.0.0.0.189.591.0j4.4.0....0...1.1.64.psy-ab..1.4.589...0.0.RiKBY71wwpc).

Here for given values, optimum fitness comes out to be 
> OptimumFitness == 729,000

As it is very unlikely to reach perfect 729,000 and stop further evolution, the fitness check is slightly forgiving
> if(outputFitnesses[index]>=728500)


#### References : 
1. [Genetic Algorithms](http://www.obitko.com/tutorials/genetic-algorithms/ga-basic-description.php)
2. [Wikipedia-Giraffe](https://en.wikipedia.org/wiki/Giraffe)
3. [Wikipedia-Evolution](https://en.wikipedia.org/wiki/Evolution)

